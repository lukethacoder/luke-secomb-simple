import { defineCollection, z } from 'astro:content'

// import { glob, file } from 'astro/loaders'
import { glob } from 'astro/loaders'

import {
  EXIF_MAKE_MAPPING,
  EXIF_MODEL_MAPPING,
  EXIF_LENS_MAPPING,
  ISO_COUNTRIES,
} from './constants'

export const PHOTOGRAPHY_TAGS = [
  'concert',
  'automotive',
  'travel',
  'street',
  'other',
] as const

export const ExifMakeKeyEnum = z.enum(
  Object.keys(EXIF_MAKE_MAPPING) as [
    keyof typeof EXIF_MAKE_MAPPING,
    ...(keyof typeof EXIF_MAKE_MAPPING)[],
  ]
)
export const ExifModelKeyEnum = z.enum(
  Object.keys(EXIF_MODEL_MAPPING) as [
    keyof typeof EXIF_MODEL_MAPPING,
    ...(keyof typeof EXIF_MODEL_MAPPING)[],
  ]
)
export const ExifLensKeyEnum = z.enum(
  Object.keys(EXIF_LENS_MAPPING) as [
    keyof typeof EXIF_LENS_MAPPING,
    ...(keyof typeof EXIF_LENS_MAPPING)[],
  ]
)

export const IsoCountriesKeyEnum = z.enum(
  Object.keys(ISO_COUNTRIES) as [
    keyof typeof ISO_COUNTRIES,
    ...(keyof typeof ISO_COUNTRIES)[],
  ]
)

const photography = defineCollection({
  // loader: file('src/data/photography.json'),
  loader: glob({ pattern: '**/*.md', base: './src/content/photography' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tags: z.array(z.enum(PHOTOGRAPHY_TAGS)).optional(),
      date: z.union([z.string().transform((str) => new Date(str)), z.date()]),
      // should match name of the file
      src: image(),
      alt: z.string(),
      // base64 encoded blurred version of the image - ideally nice and small to display while the main image is loading
      blurHash: z.string().startsWith('data:image/').optional(),
      // metadata is optional, if provided, only make + model are required
      metadata: z
        .object({
          // explicit 'make' and 'model' for cameras and lenses used. Allows us to map to "nice names" later
          make: ExifMakeKeyEnum,
          model: ExifModelKeyEnum,
          lens: ExifLensKeyEnum.optional(),
          fStop: z.number().optional(),
          shutterSpeed: z.number().optional(),
          iso: z.number().optional(),
          focalLength: z.number().optional(),
        })
        .optional(),
      location: z
        .object({
          name: z.string(),
          url: z.string().optional(),
          flag: IsoCountriesKeyEnum.optional(),
        })
        .optional(),
      links: z
        .array(
          z.object({
            url: z.string(),
            type: z.enum(['instagram', 'bandcamp', 'spotify']).optional(),
          })
        )
        .optional(),
      instagramTags: z
        .array(
          z.object({
            username: z.string(),
            position: z.array(
              z.number().max(100).min(0),
              z.number().max(100).min(0)
            ),
          })
        )
        .optional(),
    }),
})

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/**/*.{md,mdx}' }),
  schema: () =>
    z
      .object({
        title: z.string().max(140),
        slug: z.string(),
        draft: z.boolean().optional(),
        date: z.union([z.string().transform((str) => new Date(str)), z.date()]),
        editedDate: z
          .union([z.string().transform((str) => new Date(str)), z.date()])
          .optional(),
        // TODO: validate this is a color?
        color: z.string().optional(),
        description: z.string(),
        excerpt: z.string(),
        tags: z.array(z.string()).optional(),
      })
      .transform((item) => ({
        ...item,
        sortDate: item.editedDate || item.date,
      })),
})

const projects = defineCollection({
  loader: glob({
    pattern: ['./client/**/*.md', './project/**/*.md'],
    base: './src/content',
  }),
  schema: ({ image }) =>
    z.object({
      type: z.enum(['client', 'project']),
      title: z.string(),
      slug: z.string(),
      description: z.string(),
      devDescription: z.string(),
      date: z.union([z.string().transform((str) => new Date(str)), z.date()]),
      imageMain: image(),
      imageLogo: image(),
      // used by "light" themes
      imageLogoLight: image().optional(),
      url: z.string().optional(),
      published: z.boolean().optional(),
      isFeatured: z.boolean().optional(),
    }),
})

export const collections = { blog, photography, projects }
