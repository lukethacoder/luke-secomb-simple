import type { APIRoute } from 'astro'
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_TITLE } from '../../constants'

export const GET: APIRoute = async ({ site }) => {
  const allPosts = await getCollection('photography')

  // sort by date DESC
  const posts = allPosts.toSorted(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  )

  return rss({
    title: `Photography | ${SITE_TITLE}`,
    description: `Feed of recent photos I've taken. Enjoy 📷`,
    site: site || 'https://lukesecomb.digital',
    stylesheet: '/rss/styles.xsl',
    xmlns: {
      media: 'http://search.yahoo.com/mrss/',
      atom: 'http://www.w3.org/2005/Atom',
    },
    customData: `<atom:link href="${site}rss.xml" rel="self" type="application/rss+xml" />`,
    items: posts.map(({ id, data }) => ({
      title: data.title,
      description: data.title,
      pubDate: data.date,
      link: `/photography/image/${id}?image=${data.src.src}`,
      categories: data.tags,
      content: `<img src=${data.src.src} loading="lazy" />`,
      customData: `<media:content
        type="image/${data.src.format}"
        width="${data.src.width}"
        height="${data.src.height}"
        medium="image"
        url="${site + data.src.src}" />
      `,
    })),
  })
}
