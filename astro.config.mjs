import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
// import partytown from '@astrojs/partytown'
import { astroImageTools } from 'astro-imagetools'
import expressiveCode from 'astro-expressive-code'
import remarkAlerts from 'remark-alerts'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
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
    astroImageTools,
    expressiveCode({
      theme: 'one-dark-pro',
      styleOverrides: {
        // uiSelectionBackground: 'var(--theme-primary)',
        // tooltipSuccessBackground: 'var(--theme-primary)',
      },
    }),
  ],
})
