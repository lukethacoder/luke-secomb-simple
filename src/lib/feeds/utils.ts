import type { Root as HastRoot, RootContent } from 'hast'
import type { Root as MdastRoot } from 'mdast'
import type { Plugin } from 'unified'

import { Buffer } from 'node:buffer'

import minifyHtml from '@minify-html/node'
import rehypeStringify from 'rehype-stringify'
import rehypeExternalLinks from 'rehype-external-links'
import remarkMarkers from 'remark-flexible-markers'
import remarkAlerts from 'remark-alerts'
import remarkMdx from 'remark-mdx'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { getImage } from 'astro:assets'

type UrlLike = URL | string

// get dynamic import of images as a map collection
const imagesGlob = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/blog/**/*.{jpeg,jpg,png,gif}'
)

export async function mdxToHtml(
  mdxContent: string,
  site: UrlLike,
  localPath: UrlLike
): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkMarkers, { markerClassName: () => [] })
    .use(remarkAlerts)
    .use(remarkRemoveToc)
    // .use(remarkRemoveImports)
    .use(remarkRehype)
    .use(rehypeAlertEdit)
    .use(rehypeAbsoluteUrls, site, localPath)
    .use(rehypeStringify)
    .use(rehypeExternalLinks, {
      // @ts-ignore - TODO:
      rel: (el) => {
        // @ts-ignore - TODO:
        if (!el.properties.href.includes('lwc.garden')) {
          return ['nofollow noreferrer']
        }
        return []
      },
      target: '_blank',
    })
    .process(mdxContent)

  return minifyHtml
    .minify(Buffer.from(result.toString()), { keep_closing_tags: true })
    .toString()
}

export function createUrl(path: string, baseUrl: UrlLike): string | null {
  try {
    const fullUrl = new URL(path, baseUrl)
    return fullUrl.href
  } catch (error) {
    console.error('Invalid path or base URL:', error)
    return null
  }
}

// Remark plugins
// const remarkRemoveImports: Plugin<[], MdastRoot> = () => {
//   return (tree) => {
//     tree.children = tree.children.filter((node) => node.type !== '')
//     return tree
//   }
// }

const remarkRemoveToc: Plugin<[], MdastRoot> = () => {
  return (tree: MdastRoot) => {
    tree.children = tree.children.filter((node) => {
      if (node.type === 'heading' && node.depth === 2) {
        const text = node.children
          .filter((child) => child.type === 'text')
          .map((child) => child.value)
          .join('')
          .trim()
        const tocRegex = /(table[ -]of[ -])?contents?|toc/i
        return !tocRegex.test(text)
      }
      return true
    })
    return tree
  }
}

// inverts the 'remark-alerts' plugin, replaces with standard `blockquote` markup
const rehypeAlertEdit: Plugin = () => {
  return (tree) => {
    const visit = (node: RootContent | HastRoot) => {
      if (node.type === 'element') {
        if (node.properties.class) {
          const isMarkdownAlert = Array.isArray(node.properties.class)
            ? node.properties.class.includes('markdown-alert')
            : String(node.properties.class).includes('markdown-alert')

          if (isMarkdownAlert) {
            // Filter out the title element from the children
            const filteredChildren = (node.children || []).filter((child) => {
              if (child.type === 'element' && child.properties.class) {
                return !(Array.isArray(child.properties.class)
                  ? child.properties.class.includes('markdown-alert-title')
                  : String(child.properties.class).includes('markdown-alert'))
              }
              return true
            })

            const blockquote = {
              type: 'element',
              tagName: 'blockquote',
              properties: {},
              children: filteredChildren || [],
            }

            // convert the current node to a `blockquote` element
            // @ts-ignore
            const parent = node?.parent
            if (parent && 'children' in parent) {
              const index = parent.children.indexOf(node)
              if (index !== -1) {
                parent.children[index] = blockquote
              }
            }
          }
        }
      }
      if ('children' in node) {
        node.children.forEach((child) => {
          // add the parent property to the child for easier upward traversal
          // @ts-ignore
          child.parent = node
          visit(child)
        })
      }
    }
    // @ts-ignore
    visit(tree)
    return tree
  }
}

// Rehype plugins
const rehypeAbsoluteUrls: Plugin<[UrlLike, UrlLike], HastRoot> = (
  baseUrl,
  localPath
) => {
  return async (tree) => {
    const visit = async (node: RootContent | HastRoot) => {
      if (node.type === 'element') {
        if (node.tagName === 'a' && node.properties?.href) {
          node.properties.href = createUrl(
            node.properties.href as string,
            baseUrl
          )
        }
        if (node.tagName === 'img' && node.properties.src) {
          const src = String(node.properties.src || '')

          // check for relative path
          if (src && src.startsWith('./')) {
            // remove prefix of `./`
            const prefixRemoved = src.replace('./', '')

            const pathWithoutMd = `${localPath}`
              .split('/')
              .slice(0, -1)
              .join('/')

            // create prefix absolute path from root dir
            const imagePathPrefix = `/${pathWithoutMd}/${prefixRemoved}`

            // call the dynamic import and return the module
            const imagePath = await imagesGlob[imagePathPrefix]?.()?.then(
              (res) => res.default
            )

            if (imagePath) {
              const optimizedImg = await getImage({ src: imagePath })
              // set the correct path to the optimized image
              node.properties.src = `${baseUrl}${optimizedImg.src.replace('/', '')}`
            }
          }
        }
      }
      if ('children' in node) {
        // node.children.forEach(visit)
        for (const child of node.children) {
          await visit(child)
        }
      }
    }

    await visit(tree)
    return tree
  }
}
