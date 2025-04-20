import path from 'node:path'
import puppeteer from 'puppeteer'

import {
  prepHtmlTemplate,
  processImage,
  OG_WIDTH,
  OG_HEIGHT,
  staticPageToOgHtmlTemplate,
} from './utils.ts'

const OUTPUT_FOLDER = './public/og'

const STATIC_PAGES = [
  {
    page: 'home',
    // TODO: ?
    // https://www.ogimage.gallery/og-images/glyphy
    label: '',
  },
  {
    page: 'photography',
    label: 'Photography',
  },
  {
    page: 'photography-usage',
    label: 'Photography Usage',
  },
  {
    page: 'blog',
    label: 'Blog',
  },
  {
    page: 'about',
    label: 'About',
  },
  {
    page: 'projects',
    label: 'Projects',
  },
  {
    page: 'colophon',
    label: 'Colophon',
  },
  {
    page: 'rss',
    label: 'RSS',
  },
  {
    page: 'etc',
    label: 'Everything Else',
  },
  {
    page: 'uses',
    label: '/uses',
  },
]

export const processStaticPages = async (): Promise<number> => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    for (const staticPage of STATIC_PAGES) {
      const outputFolder = path.normalize(OUTPUT_FOLDER)
      const outputFile = path.normalize(
        `${outputFolder}/${staticPage.page}.jpg`
      )

      await page.setContent(
        await prepHtmlTemplate(
          staticPageToOgHtmlTemplate({ title: staticPage.label })
        )
      )

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

  return STATIC_PAGES.length
}
