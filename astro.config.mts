import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
// import partytown from '@astrojs/partytown'
import expressiveCode from 'astro-expressive-code'
import remarkAlerts from 'remark-alerts'
import { remarkReadingTime } from './lib/remark-reading-time'

// https://astro.build/config
export default defineConfig({
  site:
    import.meta.env.MODE === 'development'
      ? 'http://localhost:4321'
      : 'https://lukesecomb.digital',
  vite: {
    plugins: [tailwindcss()],
  },
  // image: {
  //   service: imageServiceConfig(),
  // },
  markdown: {
    remarkPlugins: [[remarkAlerts, { sanitize: false }], remarkReadingTime],
    shikiConfig: {
      // TODO: add custom theme
      theme: 'one-dark-pro',
      wrap: true,
    },
  },
  integrations: [
    // partytown({
    //   // Adds dataLayer.push as a forwarding-event.
    //   config: {
    //     forward: ['dataLayer.push', 'goatcounter.count'],
    //   },
    // }),
    expressiveCode({
      // @ts-ignore
      theme: 'one-dark-pro',
    }),
    mdx(),
    sitemap(),
  ],
})
