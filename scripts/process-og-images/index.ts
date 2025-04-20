import fs from 'node:fs/promises'

import { processBlogPosts } from './blog.ts'
import { processPhotos } from './photography.ts'
import { processStaticPages } from './static.ts'

const INPUT_FOLDER_BLOG = './src/content/blog'
const INPUT_FOLDER_PHOTOGRAPHY = './src/content/photography'

const main = async () => {
  try {
    await fs.stat(INPUT_FOLDER_PHOTOGRAPHY)
  } catch (error) {
    console.error(
      `Error: Directory "${INPUT_FOLDER_PHOTOGRAPHY}" does not exist.`
    )
    return
  }

  try {
    await fs.stat(INPUT_FOLDER_BLOG)
  } catch (error) {
    console.error(`Error: Directory "${INPUT_FOLDER_BLOG}" does not exist.`)
    return
  }

  const staticPages = await processStaticPages()
  console.log(`📃 ${staticPages} static pages processed`)

  const photos = await processPhotos(INPUT_FOLDER_PHOTOGRAPHY)
  console.log(`📷 ${photos} photos processed`)

  const blogs = await processBlogPosts(INPUT_FOLDER_BLOG)
  console.log(`📒 ${blogs} blog posts processed`)
}

main()
