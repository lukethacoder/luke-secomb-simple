import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'

import { Feed } from 'feed'
import type { Author, FeedOptions } from 'feed'

import { createUrl, mdxToHtml } from './utils'
import { AUTHOR } from './constants'
import { cameraMetadataToString } from '../../utils'
// import { isBlogPost, isPhotographyPost } from '../../utils'

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

  await addPhotosToFeed(feed, site, author)

  return feed
}

function createFeedInstance(site: string, author: SiteAuthor): Feed {
  const feedOptions: FeedOptions = {
    title: 'Photography Feed | Luke Secomb',
    description: `Feed of recent photos I've taken. Enjoy 📷`,
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

async function addPhotosToFeed(
  feed: Feed,
  site: string,
  author: SiteAuthor
): Promise<void> {
  const allPhotography = await getCollection('photography')

  // sort by date DESC
  const posts = allPhotography.toSorted(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  )

  for (const item of posts) {
    const link = createUrl(`/photography/image/${item.id}`, site) as string
    const content = await mdxToHtml(
      `${`${cameraMetadataToString(item.data.metadata)}<br/>`}${item.body ? item.body : ''}`,
      site,
      item.filePath || ''
    )

    const imageUrl = createUrl(
      `/photography/image/${item.id}/img.webp`,
      site
    ) as string
    const imageEl = `<img src="${imageUrl}" loading="lazy" />`

    feed.addItem({
      title: item.data.title,
      id: link || item.id,
      link,
      published: item.data.date,
      date: item.data.date,
      author: [author],
      description: cameraMetadataToString(item.data.metadata),
      content,
      image: imageUrl,
    })
  }
}
