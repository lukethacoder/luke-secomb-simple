/**
 * Generates images at build time to have a fixed URL path,
 * as opposed to the way Astro handles images OOTB
 */
import type { APIRoute } from 'astro'
import fs from 'node:fs/promises'
import sharp from 'sharp'

export const GET: APIRoute = async ({ params: { slug } }) => {
  const imageBuff = await fs.readFile(`src/content/photography/${slug}.avif`)

  const sharpResponse = await sharp(imageBuff).toBuffer()

  return new Response(sharpResponse, {
    headers: {
      'Content-Type': 'image/webp',
    },
  })
}

export async function getStaticPaths() {
  const images = import.meta.glob<{ default: ImageMetadata }>(
    '/src/content/photography/*.avif'
  )

  return Object.entries(images).map(([key, _item]) => {
    const fileName = key.split('/').at(-1)
    const slug = (fileName || '').split('.').at(0)?.toLowerCase()

    return {
      params: { slug },
      // props: {
      //   path: item(),
      // },
    }
  })
}
