import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import partytown from '@astrojs/partytown'
import { astroImageTools } from 'astro-imagetools'

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    astroImageTools,
    partytown({
      // Adds dataLayer.push as a forwarding-event.
      config: {
        forward: ['dataLayer.push', 'goatcounter.count'],
      },
    }),
  ],
})
