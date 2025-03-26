import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
// import partytown from '@astrojs/partytown'
import { astroImageTools } from 'astro-imagetools'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      // TODO: add custom theme
      theme: 'one-dark-pro',
      wrap: true,
    },
  },
  integrations: [
    astroImageTools,
    // partytown({
    //   // Adds dataLayer.push as a forwarding-event.
    //   config: {
    //     forward: ['dataLayer.push', 'goatcounter.count'],
    //   },
    // }),
  ],
})
