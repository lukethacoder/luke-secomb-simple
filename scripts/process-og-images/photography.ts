import fs from 'node:fs/promises'
import path from 'node:path'
import { getMarkdownData, processImage } from './utils.ts'

const OUTPUT_FOLDER_PHOTOGRAPHY = './public/photography/image'

async function processPhotoOg(filePath: string, imagePath: string) {
  const slug = path
    .normalize(filePath)
    .split('\\')
    .at(-1)
    ?.replace('.md', '')
    .toLowerCase()

  const outputFolder = path.normalize(`${OUTPUT_FOLDER_PHOTOGRAPHY}/${slug}`)
  const outputFile = path.normalize(`${outputFolder}/og.jpg`)
  const outputFileWebp = path.normalize(`${outputFolder}/img.webp`)

  const image = await fs.readFile(imagePath)

  // Open Graph Image (1200x630)
  await processImage(outputFolder, outputFile, image)

  // static version for RSS feeds
  await processImage(outputFolder, outputFileWebp, image, {
    // reset the OG image width/height values
    width: undefined,
    height: undefined,
    fit: 'cover',
  })
}

const extractImageSource = async (filePath: string): Promise<string | null> => {
  try {
    // Parse the frontmatter using gray-matter
    const { data } = await getMarkdownData(filePath)

    // Check if the 'src' property exists in the frontmatter
    if (data.src) {
      // Resolve the image path relative to the Markdown file's directory
      return path.resolve(path.dirname(filePath), data.src)
    }

    // If no 'src' property, return null
    return null
  } catch (error) {
    console.error(`Error processing file: ${filePath}`, error)
    return null // Return null on error to keep the script running
  }
}

export const processPhotos = async (directoryPath: string): Promise<number> => {
  let count = 0
  try {
    const files = await fs.readdir(directoryPath)

    for (const file of files) {
      const filePath = path.join(directoryPath, file)

      const stats = await fs.stat(filePath)

      if (stats.isDirectory()) {
        count += await processPhotos(filePath)
      } else if (path.extname(filePath) === '.md') {
        const imagePath = await extractImageSource(filePath)
        if (imagePath) {
          await processPhotoOg(filePath, imagePath)
          count++
        } else {
          console.log(`File: ${filePath}, No image found.`)
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory: ${directoryPath}`, error)
  }
  return count
}
