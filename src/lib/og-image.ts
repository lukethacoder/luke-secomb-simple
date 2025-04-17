import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import puppeteer from 'puppeteer'

const WIDTH = 1200
const HEIGHT = 630

async function loadFont(fontPath: string) {
  try {
    const fontData = await fs.readFile(fontPath)
    const base64Font = fontData.toString('base64')
    return `url(data:font/opentype;base64,${base64Font})`
  } catch (error) {
    console.error('Error reading font file:', error)
    return new Response('Error reading font file.', { status: 500 })
  }
}

const PADDING = 36
const PADDING_PX = `${PADDING}px`

// DO NOT CHANGE - USE THE SCALE VAR TO ADJUST
const LOGO_WIDTH = 350
const LOGO_HEIGHT = 226.86
const LOGO_SCALE = 0.2

export const CONFIG = {
  PADDING,
  PADDING_PX,
  LOGO_SCALE,
}

export const getOgImageWithWrapper = async (html: string) =>
  getOgImage(`<div
  style="display: flex; flex-direction: column; overflow: hidden; padding: ${PADDING_PX};"
>
  <div
    style="display: flex; align-items: center; justify-content: flex-start;"
  >
    <svg
      fill="#8a837f"
      style="display: flex; width: ${LOGO_WIDTH * LOGO_SCALE}; height: ${
        LOGO_HEIGHT * LOGO_SCALE
      };"
      viewBox="0 0 350 226.86"
    >
      <g>
        <path
          d="M106.94,22.24,19.24,59l87.7,37v22.24L0,71.71V46.48L106.94,0Z"
        ></path>
        <path
          d="M243.06,204.62l87.7-36.73-87.7-37V108.67L350,155.15v25.24L243.06,226.86Z"
        ></path>
        <path
          d="M242.6,0Q151.42,151.75,136.33,178.45t-15.09,35.39q0,9.77,8.26,9.77,18.25,0,67-68.93,1.08-2.17,2.61-2.17a1.16,1.16,0,0,1,.87,1.3q0,1.3-2.17,3.47l-9.35,12.83q-41.09,56.74-60.64,56.74a19.19,19.19,0,0,1-15.32-7.06q-6-7.06-6-17.91A51.52,51.52,0,0,1,112,178.78q5.54-11.18,37.67-64.59Q189,48.85,215.89.87Z"
        ></path>
      </g>
    </svg>
    <p
      style="display: flex; color: #8a837f;font-size: 28px; font-family: 'Murs Gothic';padding-left: 32px;"
    >
      lukesecomb.digital
    </p>
  </div>
  ${html}
</div>`)

export const getOgImage = async (html: string) => {
  const fontDataUri = await loadFont(path.resolve('./public', 'mg-wd.otf'))
  const fontDataUriSans = await loadFont(
    path.resolve('./public', 'noto-sans.ttf')
  )

  try {
    const htmlContent = `
    <!DOCTYPE html>
  <html>
    <head>
      <style type="text/css">
        @font-face {
          font-family: 'Murs Gothic';
          src: ${fontDataUri} format('opentype');
          font-weight: 500;
        }
        @font-face {
          font-family: 'Noto Sans';
          src: ${fontDataUriSans} format('truetype');
          font-weight: 400;
        }
        html {
          background-color: teal;
        }
        body {
          font-family: 'Murs Gothic', sans-serif;
          background-color: #0f0f0f;
          margin: 0;
          padding: 0;
          height: ${HEIGHT}px;
          width: ${WIDTH}px;
          display: flex;
          overflow: hidden;
        }
        p, mark {
          font-family: 'Noto Sans', sans-serif;
        }
      </style>
    </head>
    <body>${html}</body>
  </html>`

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(htmlContent)

    // render at x4, but zoom into match our 1200p "design"
    // @ts-ignore
    await page.evaluate(() => (document.body.style.zoom = 4))
    await page.setViewport({ width: WIDTH * 4, height: HEIGHT * 4 })

    const imageBuffer = await page.screenshot({ type: 'webp', quality: 100 })

    const sharpResponse = await sharp(imageBuffer)
      .resize({
        width: WIDTH,
        height: HEIGHT,
        fit: 'cover',
        withoutEnlargement: true,
      })
      .webp()
      .toBuffer()

    await browser.close()

    return new Response(sharpResponse, {
      headers: {
        'Content-Type': 'image/webp',
      },
    })
  } catch (error) {
    console.error('Error generating Open Graph image:', error)
    return new Response('Error generating image.', {
      status: 500,
    })
  }
}
