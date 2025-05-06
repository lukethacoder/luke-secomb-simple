<div align="center">
  <br>
  <br>
  <img alt="luke-secomb-simple" src="./public/favicon.jpg" width="180">
  <br>
  <br>
  <strong>Personal site built using AstroJS</strong>
</div>
<br>

## 🔥 Local Development

**Run the development server**

```shell
pnpm install
```

**Edit the Environment variables.**

```env
CF_PAGES_URL=http://localhost:4321
PUBLIC_LAST_FM_API_KEY=abcdefghijklmnopqrstuvwxyz123456
PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID=abcdefghijklmnopqrstuvwxyz123456
PUBLIC_GOAT_COUNTER_CODE=goat
```

**Start the site in `dev` mode.**

```sh
pnpm dev
```

**Open the code in your IDE of choice and start editing!**

Your site is now running at `http://localhost:4321`.

## Scripts

### `photos`

Drop full size images (straight out of lightroom) into the `./.photos` directory. Run the `pnpm photos` script to auto optimise, extract EXIF data, create a blurHash and save metadata to a boilerplate markdown file. This file will still require some edits, but most of the heavy lifting has been sorted.

Once completed, images will be moved to the `./.photos-completed` folder.

### `ogs` (Open Graph Images)

OG images use [puppeteer](https://pptr.dev/) under the hood to bypass to issues with [satori](https://github.com/vercel/satori/issues/656) and [satori-html](https://github.com/natemoo-re/satori-html/issues/20). This script will automatically generate Open Graph Images for all* pages on the site (blogs, photos and static pages).

Paths used here map to the output of the content directories, so og images will sit next to their respective HTML output.

> [!NOTE]
> OG images are not regenerated unless they are removed

## Patches

We are currently running some custom patches on the [`feed`](https://github.com/jpmonette/feed) package. These can be baked into your `./node_modules` by running:

```bash
pnpm patch feed@4.2.2
```

Patch: You can now edit the package at:

```
PATH_TO_ROOT\luke-secomb-simple\node_modules\.pnpm_patches\feed@4.2.2
```

To commit your changes, run:

```bash
pnpm patch-commit "PATH_TO_ROOT\luke-secomb-simple\node_modules\.pnpm_patches\feed@4.2.2"
```
  
`feed` fixes include:
- add `stylesheet` support for both RSS and Atom feeds
- add image support for Atom feeds ([feed/#195](https://github.com/jpmonette/feed/issues/195))

Full patch can be found in [./patches/feed@4.2.2.patch](./patches/feed@4.2.2.patch).