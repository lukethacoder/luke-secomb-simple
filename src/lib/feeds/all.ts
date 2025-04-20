import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'

import { Feed } from 'feed'
import type { Author, FeedOptions } from 'feed'

import { createUrl, mdxToHtml } from './utils'
import { AUTHOR } from './constants'
import {
  cameraMetadataToString,
  isBlogPost,
  isPhotographyPost,
} from '../../utils'

interface SiteAuthor extends Author {
  link: string
}

export async function generateFeed(context: APIContext): Promise<Feed> {
  // biome-ignore lint/style/noNonNullAssertion: we know
  const site = context.site!.toString()
  const author: SiteAuthor = {
    ...AUTHOR,
    link: site,
  }
  const feed = createFeedInstance(site, author)

  await addArticlesToFeed(feed, site, author)

  return feed
}

function createFeedInstance(site: string, author: SiteAuthor): Feed {
  const feedOptions: FeedOptions = {
    title: 'Everything Feed | Luke Secomb',
    description: 'Articles and Photography by Luke Secomb',
    id: site,
    link: site || 'https://lukesecomb.digital',
    generator: site || 'https://lukesecomb.digital',
    language: 'en-us',
    favicon: createUrl('/favicon.jpg', site) as string,
    copyright: `Copyright ${new Date().getFullYear()} Luke Secomb`,
    // @ts-ignore - TODO: check
    stylesheet: createUrl('/rss/styles.xsl', site) as string,
    feedLinks: {
      rss: createUrl('/rss.xml', site) as string,
      atom: createUrl('/atom.xml', site) as string,
    },
    author,
  }

  return new Feed(feedOptions)
}

async function addArticlesToFeed(
  feed: Feed,
  site: string,
  author: SiteAuthor
): Promise<void> {
  const allPosts = await getCollection('blog')
  const allPhotography = await getCollection('photography')

  const allItems = [...allPosts, ...allPhotography]

  // sort by date DESC
  const posts = allItems.toSorted((a, b) => {
    const bDate = isBlogPost(b) ? b.data.sortDate : b.data.date
    const aDate = isBlogPost(a) ? a.data.sortDate : a.data.date

    return bDate.getTime() - aDate.getTime()
  })

  for (const item of posts) {
    const link = isBlogPost(item)
      ? (createUrl(`/blog/${item.data.slug}`, site) as string)
      : (createUrl(`/photography/image/${item.id}`, site) as string)

    // only for photography pages
    const imageUrl = createUrl(
      `/photography/image/${item.id}/img.webp`,
      site
    ) as string

    // only for blog pages
    const imageUrlBlog = createUrl(`/blog/${item.id}/og.jpg`, site) as string

    feed.addItem({
      title: item.data.title,
      id: link || item.id,
      link,
      published: item.data.date,
      date: isBlogPost(item)
        ? item.data.sortDate || item.data.date
        : item.data.date,
      author: [author],
      description: isBlogPost(item)
        ? item.data.description
        : cameraMetadataToString(item.data.metadata),
      image: isPhotographyPost(item) ? imageUrl : imageUrlBlog,
      content: isPhotographyPost(item)
        ? await mdxToHtml(
            `<img src="${imageUrl}" loading="lazy" />`,
            site,
            item.filePath || ''
          )
        : await mdxToHtml(item.body || '', site, item.filePath || ''),
    })
  }
}
