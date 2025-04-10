import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_TITLE, SITE_DESCRIPTION } from '../../constants'

export async function GET(context) {
  const allPosts = await getCollection('blog')

  // sort by date DESC
  const posts = allPosts.toSorted(
    (a, b) => b.data.sortDate.getTime() - a.data.sortDate.getTime()
  )

  return rss({
    title: SITE_TITLE,
    description: 'Collection of recently published blog posts',
    site: context.site || 'https://lukesecomb.digital',
    stylesheet: '/rss/styles.xsl',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      updated: post.data.editedDate,
      link: `/blog/${post.data.slug}/`,
      customData: `<updated>${post.data.editedDate}</updated>`,
    })),
  })
}
