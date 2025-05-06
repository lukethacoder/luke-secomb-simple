import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import type { ResizeOptions } from 'sharp'
import matter from 'gray-matter'

export const OG_WIDTH = 1200
export const OG_HEIGHT = 630

export const getMarkdownData = async (
  filePath: string
): Promise<any | null> => {
  try {
    const content = await fs.readFile(filePath, 'utf8')

    return matter(content)
  } catch (error) {
    console.error(`Error processing file: ${filePath}`, error)
    return null
  }
}

export async function processImage(
  outputFolder: string,
  outputFile: string,
  imageBuffer:
    | Buffer
    | ArrayBuffer
    | Uint8Array
    | Uint8ClampedArray
    | Int8Array
    | Uint16Array
    | Int16Array
    | Uint32Array
    | Int32Array
    | Float32Array
    | Float64Array
    | string,
  sharpResizeOptions?: ResizeOptions
) {
  const defaultSharpOptions: ResizeOptions = {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fit: 'contain',
    withoutEnlargement: true,
    background: '#0f0f0f',
  }

  try {
    await fs.stat(outputFile)
    // already exists - ignore
    // delete the file to rebuild the Open Graph Image
    return
  } catch (error) {
    // non-error, please continue and create the Open Graph Image
    console.log('processing ', outputFile)
  }

  try {
    await fs.stat(outputFolder)
  } catch (error) {
    await fs.mkdir(outputFolder, { recursive: true })
  }

  await sharp(imageBuffer)
    .resize({
      ...defaultSharpOptions,
      ...sharpResizeOptions,
    })
    .jpeg()
    .toFile(outputFile)
}

export async function loadFont(fontPath: string) {
  try {
    const fontData = await fs.readFile(fontPath)
    const base64Font = fontData.toString('base64')
    return `url(data:font/opentype;base64,${base64Font})`
  } catch (error) {
    console.error('Error reading font file:', error)
    return new Response('Error reading font file.', { status: 500 })
  }
}

export const blogToOgHtmlTemplate = ({
  title,
  date,
  readingTime,
}: {
  title: string
  date: Date
  readingTime: string
}) => {
  return getOgImageTemplate(`
<div class="title">
  <h1
    style="color: white;font-size: 82px;max-width: 100%; text-wrap: balance; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; margin: 0; padding: 24px 0;"
  >
  ${title}
  </h1>
</div>
<div class="metadata">
  <div>
    <p>
      ${new Intl.DateTimeFormat('en-AU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(date)}
      — ${readingTime}
    </p>
  </div>
</div>`)
}

export const staticPageToOgHtmlTemplate = ({ title }: { title: string }) => {
  return getOgImageTemplate(`
<div class="title">
  <h1
    style="color: white;font-size: 82px;max-width: 100%; text-wrap: balance; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; margin: 0; padding: 24px 0;"
  >
  ${title}
  </h1>
</div>`)
}

export const getOgImageTemplate = (html: string) => `<div class="main">
  <header>
    <svg viewBox="0 0 350 226.86">
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
    <p>lukesecomb.digital</p>
  </header>
  <span id="content">${html}</span>
</div>`

export const prepHtmlTemplate = async (html: string) => {
  const fontDataUri = await loadFont(path.resolve('./public', 'mg-wd.otf'))
  const fontDataUriSans = await loadFont(
    path.resolve('./public', 'noto-sans.ttf')
  )

  return `
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
      background-color: burlywood;
    }
    :root {
      --vp-width: ${OG_WIDTH}px;
      --vp-height: ${OG_HEIGHT}px;
      --logo-width: 350px;
      --logo-height: 226.86px;
      --logo-scale: 0.2;
      --padding: 36px;
    }
    body {
      font-family: 'Murs Gothic', sans-serif;
      background-color: #0f0f0f;
      margin: 0;
      padding: 0;
      height: var(--vp-height);
      width: var(--vp-width);
      display: flex;
      overflow: hidden;
    }
    p, mark {
      font-family: 'Noto Sans', sans-serif;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    header svg {
      fill: #8a837f;
      display: flex;
      width: calc(var(--logo-width) * var(--logo-scale));
      height: calc(var(--logo-height) * var(--logo-scale));
    }
    header p {
      display: flex;
      color: #8a837f;
      font-size: 28px;
      font-family: 'Murs Gothic';
      padding-left: 32px;
    }
    .main {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: var(--padding);
    }
    #content {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    #content .title {
      flex: 1;
    }
    #content .title h1 {
      color: white;
      font-size: 82px;
      max-width: 100%;
      text-wrap: balance;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin: 0;
      padding: 24px 0;
    }
    #content .metadata {
      display: flex;
      align-items: flex-end;
      font-family: 'Noto Sans';
      color: #fff;
      font-size: 24px;
    }
    #content .metadata p {
      text-transform: uppercase;
      margin: 0 0 2px;
    }
  </style>
</head>
<body>${html}</body>
</html>`
}
