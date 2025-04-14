import type { APIRoute } from 'astro'
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_TITLE } from '../constants'
import { isBlogPost, isPhotographyPost } from '../utils'

export const GET: APIRoute = async ({ site }) => {
  const allPosts = await getCollection('blog')
  const allPhotography = await getCollection('photography')

  const allItems = [...allPosts, ...allPhotography]

  // sort by date DESC
  const posts = allItems.toSorted((a, b) => {
    const bDate = isBlogPost(b) ? b.data.sortDate : b.data.date
    const aDate = isBlogPost(a) ? a.data.sortDate : a.data.date

    return bDate.getTime() - aDate.getTime()
  })

  return rss({
    title: SITE_TITLE,
    description: 'Collection of recently published blog posts and photography',
    site: site || 'https://lukesecomb.digital',
    stylesheet: '/rss/styles.xsl',
    items: posts.map((post) => {
      const { title, date } = post.data

      const link = isBlogPost(post)
        ? `/${post.collection}/${post.data.slug}/`
        : `/${post.collection}/image/${post.id}/`

      const description = isBlogPost(post) ? post.data?.description : ''

      return {
        title,
        pubDate: date,
        description,
        link,
        ...(isPhotographyPost(post)
          ? {
              customData: `<media:content
              type="image/${post.data.src.format}"
              width="${post.data.src.width}"
              height="${post.data.src.height}"
              medium="image"
              url="${site + post.data.src.src}" />
            `,
            }
          : {}),
      }
    }),
  })
}
