import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_TITLE, SITE_DESCRIPTION } from '../constants'

export async function GET(context) {
  const allPosts = await getCollection('blog')
  const allPhotography = await getCollection('photography')

  // sort by date DESC
  const posts = [...allPosts, ...allPhotography].toSorted(
    (a, b) =>
      (b.data.sortDate || b.data.date).getTime() -
      (a.data.sortDate || a.data.date).getTime()
  )

  return rss({
    title: SITE_TITLE,
    description: 'Collection of recently published blog posts and photography',
    site: context.site || 'https://lukesecomb.digital',
    stylesheet: '/rss/styles.xsl',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/${post.collection}/${post.data.slug}/`,
      ...(post.collection === 'photograhy'
        ? {
            customData: `<media:content
            type="image/${post.data.src.format}"
            width="${post.data.src.width}"
            height="${post.data.src.height}"
            medium="image"
            url="${context.site + post.data.src.src}" />
          `,
          }
        : {}),
    })),
  })
}
