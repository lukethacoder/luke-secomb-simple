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
import sharp from 'sharp'
// @ts-ignore
import exifr from 'exifr/dist/full.esm.mjs'

const PHOTOS_FOLDER = '.photos'
const OUTPUT_BASE_FOLDER = 'src/content/photography'
const PHOTOS_COMPLETED_FOLDER = '.photos-completed'

async function processImages() {
  try {
    const files = await fs.readdir(PHOTOS_FOLDER)

    for (const file of files) {
      const filePath = path.join(PHOTOS_FOLDER, file)
      const stats = await fs.stat(filePath)

      if (stats.isFile() && /\.(jpg|jpeg|png|tif)$/i.test(file)) {
        console.log(`Processing image: ${file}`)
        await processImage(filePath, file)
      }
    }

    console.log('Image processing complete.')
  } catch (error) {
    console.error('Error reading or processing files:', error)
  }
}

async function moveOriginalImage(filePath: string, imageName: string) {
  try {
    await fs.mkdir(PHOTOS_COMPLETED_FOLDER, { recursive: true })
    const newPath = path.join(PHOTOS_COMPLETED_FOLDER, imageName)
    await fs.rename(filePath, newPath)
    console.log(
      `Moved original image: ${imageName} to ${PHOTOS_COMPLETED_FOLDER}`
    )
  } catch (error) {
    console.error(`Error moving original image ${imageName}:`, error)
  }
}

async function processImage(imagePath: string, imageName: string) {
  try {
    const exifData = await exifr.parse(imagePath)

    const make = exifData?.Make
    const model = exifData?.Model
    const lens = exifData?.LensModel
    const fStop = exifData?.FNumber
    const shutterSpeed = exifData?.ExposureTime
    const iso = exifData?.ISO
    const focalLength = exifData?.FocalLengthIn35mmFormat

    let dateTaken: Date | null = null
    if (exifData.DateTimeOriginal) {
      const dateTimeOriginal = (exifData.DateTimeOriginal as string).toString()
      dateTaken = new Date(dateTimeOriginal)
    } else if (exifData.DateTimeDigitized) {
      const dateTimeDigitized = (
        exifData.DateTimeDigitized as string
      ).toString()
      dateTaken = new Date(dateTimeDigitized)
    } else {
      console.warn(
        `No "Date taken" EXIF data found for ${imageName}. Falling back to file creation date.`
      )
      const stats = await fs.stat(imagePath)
      dateTaken = stats.birthtime
    }

    const year = dateTaken.getFullYear()
    const month = String(dateTaken.getMonth() + 1).padStart(2, '0')
    const day = String(dateTaken.getDate()).padStart(2, '0')

    const fileNameRaw = path.parse(imageName).name
    const fileName = `${year}-${month}-${day}-${fileNameRaw}`
    const fileNameWithExtension = `${fileName}.avif`
    const outputAvifPath = path.join(OUTPUT_BASE_FOLDER, fileNameWithExtension)

    await fs.mkdir(OUTPUT_BASE_FOLDER, { recursive: true })

    try {
      await sharp(imagePath)
        .resize({
          width: 1920,
          height: 1920,
          fit: 'inside',
          withoutEnlargement: true,
        })
        // minor sharpening - nothing too intense
        .sharpen({
          sigma: 0.75,
          m1: 0.5,
          m2: 1.0,
        })
        // quality 50 seems to be good middle ground of file size and quality retention
        .avif({ quality: 50 })
        .toFile(outputAvifPath)

      // small placeholder image - ideally this is real small and loads nice and fast before the main image
      const blurHash = await sharp(imagePath)
        .resize({
          width: 1920,
          height: 1920,
          fit: 'inside',
          withoutEnlargement: true,
        })
        // nice blur to reduce file size
        .blur(95)
        // quality 50 seems to be good middle ground of file size and quality retention
        .avif({ quality: 5 })
        .toBuffer()

      console.log(`Converted ${imagePath} to ${outputAvifPath}`)

      // NOTE: metadata is in its raw EXIF format. FED implementation should handle formatting (and data mapping)
      const markdownContent = `---
title: ${fileNameRaw}
date: ${dateTaken.toISOString()}
tags: []
src: "./${fileNameWithExtension}"
alt: image
${
  make && model
    ? `metadata:
  make: ${make}
  model: ${model}
  lens: ${lens}
  fStop: ${fStop}
  shutterSpeed: ${shutterSpeed}
  iso: ${iso}
  focalLength: ${focalLength}
`
    : ''
}
blurHash: "data:image/avif;base64,${blurHash.toString('base64')}"
---`

      const markdownFileName = `${year}-${month}-${day}-${fileNameRaw}.md`
      const markdownFilePath = path.join(OUTPUT_BASE_FOLDER, markdownFileName)

      await fs.writeFile(markdownFilePath, markdownContent, 'utf-8')
      console.log(`Created markdown file: ${markdownFilePath}`)

      // Move the original image after successful processing
      await moveOriginalImage(imagePath, imageName)
    } catch (error) {
      console.error(`Error processing ${imageName} with sharp: `, error)
    }
  } catch (error) {
    console.error(`Error processing ${imageName}: `, error)
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
    await fs.mkdir(OUTPUT_BASE_FOLDER, { recursive: true })
  } catch (error) {
    console.error(
      `Error creating output base folder "${OUTPUT_BASE_FOLDER}": `,
      error
    )
    return
  }

  await processImages()
}

main().catch(console.error)
