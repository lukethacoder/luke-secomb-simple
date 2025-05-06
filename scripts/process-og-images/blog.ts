import fs from 'node:fs/promises'
import path from 'node:path'
import puppeteer from 'puppeteer'
import getReadingTime from 'reading-time'

import {
  blogToOgHtmlTemplate,
  prepHtmlTemplate,
  processImage,
  getMarkdownData,
  OG_WIDTH,
  OG_HEIGHT,
} from './utils.ts'

const OUTPUT_FOLDER_BLOG = './public/blog'

async function handlePuppeteerBlogPosts(posts: any[]) {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    for (const post of posts) {
      const outputFolder = path.normalize(`${OUTPUT_FOLDER_BLOG}/${post.slug}`)
      const outputFile = path.normalize(`${outputFolder}/og.jpg`)

      await page.setContent(await prepHtmlTemplate(post.og))

      // render at x4, but zoom into match our 1200p "design"
      // @ts-ignore
      await page.evaluate(() => (document.body.style.zoom = 4))
      await page.setViewport({ width: OG_WIDTH * 4, height: OG_HEIGHT * 4 })

      const imageBuffer = await page.screenshot({ type: 'webp', quality: 100 })
      await processImage(outputFolder, outputFile, imageBuffer)
    }

    await browser.close()
  } catch (error) {
    console.error('Error generating Open Graph image:', error)
  }
}

export const processBlogPosts = async (
  directoryPath: string
): Promise<number> => {
  let count = 0
  try {
    const files = await fs.readdir(directoryPath)

    const posts = []

    for (const file of files) {
      const filePath = path.join(directoryPath, file)

      const stats = await fs.stat(filePath)

      if (stats.isDirectory()) {
        count += await processBlogPosts(filePath)
      } else if (path.extname(filePath) === '.md') {
        // Parse the frontmatter using gray-matter - ignore the blurHash values
        const {
          content,
          data: { blurHash, ...data },
        } = await getMarkdownData(filePath)

        const _data = {
          ...data,
          readingTime: getReadingTime(content).text,
        }

        posts.push({
          ..._data,
          og: blogToOgHtmlTemplate(_data),
        })
        count++
      }
    }

    await handlePuppeteerBlogPosts(posts)
  } catch (error) {
    console.error(`Error reading directory: ${directoryPath}`, error)
  }

  return count
}
