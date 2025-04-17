import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { getOgImageWithWrapper } from '../../../lib/og-image'

export const GET: APIRoute = async ({ props }) => {
  const { title, date } = props.data
  const { readingTime } = props.rendered.metadata.frontmatter

  return getOgImageWithWrapper(`
    <div style="flex: 1;">
      <h1
        style="color: white;font-size: 82px;max-width: 100%; text-wrap: balance; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; margin: 0; padding: 24px 0;"
      >
      ${title}
      </h1>
    </div>
    <div
      style="display: flex; align-items: flex-end; font-family: 'Noto Sans';"
    >
      <div style="display: flex; color: #fff;font-size: 24px;">
        <p style="text-transform: uppercase; margin: 0 0 2px;">
          ${new Intl.DateTimeFormat(
            navigator.language || navigator.languages[0] || 'en-AU',
            {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }
          ).format(date)}
          — ${readingTime}
        </p>
      </div>
    </div>`)
}

export async function getStaticPaths() {
  const allBlog = await getCollection('blog')

  return allBlog.map((item) => ({
    params: {
      slug: item.data.slug,
    },
    props: {
      ...item,
    },
  }))
}
