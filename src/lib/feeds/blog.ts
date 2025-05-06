import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'

import { Feed } from 'feed'
import type { Author, FeedOptions } from 'feed'

import { createUrl, mdxToHtml } from './utils'
import { AUTHOR } from './constants'

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
    title: 'Articles Feed | Luke Secomb',
    description: 'Various articles by Luke Secomb',
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
  const allBlogs = (await getCollection('blog')).sort(
    (a, b) => b.data.sortDate.valueOf() - a.data.sortDate.valueOf()
  )

  for (const item of allBlogs) {
    const link = createUrl(`/blog/${item.data.slug}`, site) as string
    const content = await mdxToHtml(item.body || '', site, item.filePath || '')

    const imageUrl = createUrl(`/blog/${item.id}/og.jpg`, site) as string

    feed.addItem({
      title: item.data.title,
      id: link,
      link,
      published: item.data.date,
      date: item.data.sortDate || item.data.date,
      author: [author],
      description: 'test',
      // description: await mdxToHtml(item.data.description, site, link),
      content,
      image: imageUrl,
    })
  }
}
