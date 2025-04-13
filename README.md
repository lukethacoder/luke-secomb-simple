<div align="center">
  <br>
  <br>
  <img alt="luke-secomb-simple" src="./public/favicon.svg" width="180">
  <br>
  <br>
  <strong>Simple portfolio site built using 11ty</strong>
</div>
<br>

<!-- ## Built With -->

<!-- - ![Astro](https://img.shields.io/badge/astro-38286f?style=for-the-badge&logo=astro&logoColor=white) 
- ![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-0f172a?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8)
- ![LastFM](https://img.shields.io/badge/LastFM-D51007?style=for-the-badge&logo=lastdotfm&logoColor=white)
- ![GoatCounter](https://img.shields.io/badge/Goat%20Counter-9a15a4?style=for-the-badge)
- ![Google Analytics](https://img.shields.io/badge/Google%20Analytics-E37400?style=for-the-badge&logo=googleanalytics&logoColor=white) -->

## 🔥 Local Development

**Run the development server**

```shell
pnpm dlx @11ty/eleventy --serve
```

**Edit the Environment variables.**

```env
PUBLIC_LAST_FM_API_KEY=abcdefghijklmnopqrstuvwxyz123456
PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID=abcdefghijklmnopqrstuvwxyz123456
PUBLIC_CLARITY_ANALYTICS_TRACKING_CODE=cthbfzqwds
PUBLIC_GOAT_COUNTER_CODE=goat
```

**Start the site in `dev` mode.**

```sh
pnpm dev
```

**Open the code in your IDE of choice and start editing!**

Your site is now running at `http://localhost:8000`.

## Scripts

### Photos

Drop full size images (straight out of lightroom) into the `./.photos` directory. Run the `pnpm photos` script to auto optimise, extract EXIF data, create a blurHash and save metadata to a boilerplate markdown file. This file will still require some edits, but most of the heavy lifting has been sorted.