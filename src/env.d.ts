/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_LAST_FM_API_KEY: string
  readonly PUBLIC_GOOGLE_ANALYTICS_TRACKING_CODE: string
  readonly PUBLIC_GOAT_COUNTER_CODE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Extend the Astro frontmatter type to include 'readingTime'
declare module 'astro' {
  interface AstroFrontmatter {
    readingTime?: string
  }
}

export {}
