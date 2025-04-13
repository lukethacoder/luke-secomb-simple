import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
// import partytown from '@astrojs/partytown'
import expressiveCode from 'astro-expressive-code'
import remarkAlerts from 'remark-alerts'

// https://astro.build/config
export default defineConfig({
  site: 'https://lukesecomb.digital',
  vite: {
    plugins: [tailwindcss()],
  },
  // image: {
  //   service: imageServiceConfig(),
  // },
  markdown: {
    remarkPlugins: [[remarkAlerts, { sanitize: false }]],
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
