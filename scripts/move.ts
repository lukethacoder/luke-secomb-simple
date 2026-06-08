/**
 * This script pulls new photos from the `./.photos` directory and processes them
 * automatically into the right folder and with a placeholder markdown file.
 *
 * Markdown files will still need to be edited with proper titles and alt text.
 *
 * The script also runs some initial image processing so images are not stored
 * in a high quality resolution in the git repo. blurHashes are also saved in
 * the markdown file.
 *
 * Run this script with `node ./scripts/process-photos.ts` (min node v23.6.0)
 */
import fs from 'fs/promises'
import path from 'path'

const PHOTOS_FOLDER = '.to-folders'
const OUTPUT_PHOTO_BASE_FOLDER = 'public/photography/image'

async function processImages() {
  try {
    const files = await fs.readdir(PHOTOS_FOLDER)
    await fs.mkdir(OUTPUT_PHOTO_BASE_FOLDER, { recursive: true })

    for (const file of files) {
      const filePath = path.join(PHOTOS_FOLDER, file)
      const stats = await fs.stat(filePath)

      if (stats.isFile() && /\.(jpg|jpeg|png|tif|avif)$/i.test(file)) {
        console.log(`Processing image: ${file}`)

        try {
          const outputFolder = path.join(
            OUTPUT_PHOTO_BASE_FOLDER,
            file.replace('.avif', '')
          )
          const newPath = path.join(outputFolder, `img.avif`)

          await fs.rename(filePath, newPath)
          console.log(`Moved original image: "${filePath}" to "${newPath}"`)
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
    await fs.access(PHOTOS_FOLDER)
  } catch (error) {
    console.error(
      `Error: The folder "${PHOTOS_FOLDER}" does not exist in the current directory.`
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
