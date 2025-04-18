import type { APIRoute } from 'astro'
import { getImage } from 'astro:assets'

export const GET: APIRoute = async ({ request, props }) => {
  const url = new URL(request.url)
  const isThisTheImage = await getImage({ src: props.path })

  return await fetch(
    `${url.origin}/_image?href=${encodeURIComponent(isThisTheImage.src)}`
  )
}

export async function getStaticPaths() {
  const images = import.meta.glob<{ default: ImageMetadata }>(
    '/src/content/photography/**/*.{avif}'
  )

  return Object.entries(images).map(([key, item]) => {
    const slug = key.split('/').at(-1)

    return {
      params: { slug },
      props: {
        path: item(),
      },
    }
  })
}
