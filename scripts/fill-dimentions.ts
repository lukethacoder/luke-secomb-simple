import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import matter from 'gray-matter'

import { getMarkdownData } from './utils.ts'

const OUTPUT_PHOTO_BASE_FOLDER = 'public/photography/image'
const OUTPUT_MD_BASE_FOLDER = 'src/content/photography'

async function processImages() {
  try {
    const files = await fs.readdir(OUTPUT_MD_BASE_FOLDER)

    for (const file of files) {
      const filePath = path.join(OUTPUT_MD_BASE_FOLDER, file)
      const stats = await fs.stat(filePath)

      // check if .md file
      if (stats.isFile() && /\.(md)$/i.test(file)) {
        console.log(`Processing md file: ${file}`)

        try {
          const { data, content } = await getMarkdownData(filePath)

          if (!data.imgHeight || !data.imgWidth) {
            console.log('no img width/height data', file)

            const imageFolder = path.join(
              OUTPUT_PHOTO_BASE_FOLDER,
              file.replace('.md', '')
            )

            const metadata = await sharp(`${imageFolder}/img.avif`).metadata()

            const { blurHash, ...data2 } = data

            const asString = matter.stringify(content, {
              ...data2,
              imgWidth: metadata.width,
              imgHeight: metadata.height,
              blurHash: data.blurHash,
            })

            const markdownFilePath = path.join(OUTPUT_MD_BASE_FOLDER, file)
            await fs.writeFile(markdownFilePath, asString, 'utf-8')
          }

          // console.log('data ', data)
          // TODO: read markdown frontmatter and check for missing imgWidth/imgHeight
          // const outputFolder = path.join(
          //   OUTPUT_PHOTO_BASE_FOLDER,
          //   file.replace('.avif', '')
          // )
          // const newPath = path.join(outputFolder, `img.avif`)
          // await fs.rename(filePath, newPath)
          // console.log(`Moved original image: "${filePath}" to "${newPath}"`)
        } catch (error) {
          console.error(`Error moving original image ${filePath}:`, error)
        }
      }
    }

    console.log('Image processing complete.')
  } catch (error) {
    console.error('Error reading or processing files:', error)
  }
}

async function main() {
  try {
    await fs.access(OUTPUT_MD_BASE_FOLDER)
  } catch (error) {
    console.error(
      `Error: The folder "${OUTPUT_MD_BASE_FOLDER}" does not exist in the current directory.`
    )
    return
  }

  try {
    await fs.mkdir(OUTPUT_PHOTO_BASE_FOLDER, { recursive: true })
  } catch (error) {
    console.error(
      `Error creating output base folder "${OUTPUT_PHOTO_BASE_FOLDER}": `,
      error
    )
    return
  }

  await processImages()
}

main().catch(console.error)
