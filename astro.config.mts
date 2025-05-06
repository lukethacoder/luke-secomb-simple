import { loadEnv } from 'vite'
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
import partytown from '@astrojs/partytown'
import expressiveCode from 'astro-expressive-code'
import remarkAlerts from 'remark-alerts'
import rehypeExternalLinks from 'rehype-external-links'
import { remarkReadingTime } from './lib/remark-reading-time'

const { CF_PAGES_URL } = loadEnv(
  process.env.NODE_ENV || 'development',
  process.cwd(),
  ''
)

// https://astro.build/config
export default defineConfig({
  site: CF_PAGES_URL,
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [[remarkAlerts, { sanitize: false }], remarkReadingTime],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          // @ts-ignore - TODO:
          rel: (el) => {
            if (!el.properties.href.includes('lwc.garden')) {
              return ['nofollow noreferrer']
            }
            return []
          },
          target: '_blank',
        },
      ],
    ],
    shikiConfig: {
      // TODO: add custom theme
      theme: 'one-dark-pro',
      wrap: true,
    },
  },
  integrations: [
    partytown({
      // Adds dataLayer.push as a forwarding-event.
      config: {
        forward: ['dataLayer.push', 'goatcounter.count'],
      },
    }),
    expressiveCode({
      // @ts-ignore
      theme: 'one-dark-pro',
    }),
    mdx(),
    sitemap(),
  ],
})
