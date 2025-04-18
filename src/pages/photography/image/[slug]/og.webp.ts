import type { APIRoute } from 'astro'
import fs from 'node:fs/promises'
import sharp from 'sharp'

export const GET: APIRoute = async ({ params: { slug } }) => {
  const imageBuff = await fs.readFile(`src/content/photography/${slug}.avif`)

  const sharpResponse = await sharp(imageBuff)
    .resize({
      width: 1200,
      height: 630,
      fit: 'contain',
      withoutEnlargement: true,
      background: '#0f0f0f',
    })
    .toBuffer()

  return new Response(sharpResponse, {
    headers: {
      'Content-Type': 'image/webp',
    },
  })

  // TODO: pull in image metadata to display here
  // return getOgImage(`
  //   <div style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;">
  //     <img src="${imageSrc}" style="object-fit: contain;max-width: 100%;max-height: 100%;" />
  //   </div>
  // `)
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
