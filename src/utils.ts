import { CollectionEntry, InferEntrySchema } from 'astro:content'
import {
  EXIF_LENS_MAPPING,
  EXIF_MAKE_MAPPING,
  EXIF_MODEL_MAPPING,
} from './constants'

export const getUrlParam = (key: string): string | null =>
  new URL(window.location.href).searchParams.get(key)

export const setUrlParam = (
  key: string,
  value: string,
  replaceHistory = true
) => {
  const url = new URL(window.location.href)
  url.searchParams.set(key, value)

  if (replaceHistory) {
    history.replaceState(null, '', `?${url.searchParams.toString()}`)
  } else {
    history.pushState(null, '', `?${url.searchParams.toString()}`)
  }
}

export const getSessionStorage = (key: string): string | null =>
  window.sessionStorage.getItem(key)

export const setSessionStorage = (key: string, value: string) =>
  window.sessionStorage.setItem(key, value)

export function formatShutterSpeed(exposureTime: number): string | null {
  if (typeof exposureTime !== 'number' || exposureTime <= 0) {
    return null
  }

  if (exposureTime >= 1) {
    return `${exposureTime} sec.`
  } else {
    // Convert to a fraction
    let numerator = 1
    let denominator = 1 / exposureTime

    // Simplify the fraction (optional, but makes it more readable)
    for (let i = 2; i <= Math.min(numerator, denominator); i++) {
      while (numerator % i === 0 && denominator % i === 0) {
        numerator /= i
        denominator /= i
      }
    }

    return `${numerator}/${Math.round(denominator)} sec.`
  }
}

export function isBlogPost(
  item: CollectionEntry<'blog'> | CollectionEntry<'photography'>
): item is CollectionEntry<'blog'> {
  return item.collection === 'blog'
}

export function isPhotographyPost(
  item: CollectionEntry<'blog'> | CollectionEntry<'photography'>
): item is CollectionEntry<'photography'> {
  return item.collection === 'photography'
}

export function cameraMetadataToString(
  metadata: InferEntrySchema<'photography'>['metadata']
): string {
  if (metadata) {
    const { make, model, lens, fStop, shutterSpeed, iso, focalLength } =
      metadata

    const makeDisplay = EXIF_MAKE_MAPPING[make]
    const modelDisplay = EXIF_MODEL_MAPPING[model]
    const lensDisplay = lens ? EXIF_LENS_MAPPING[lens] : undefined

    const items: string[] = lensDisplay
      ? [`${makeDisplay} ${modelDisplay} - ${lensDisplay}`]
      : [`${makeDisplay} ${modelDisplay}`]
    if (shutterSpeed) {
      const formattedShutterSpeed = formatShutterSpeed(shutterSpeed)
      if (formattedShutterSpeed) {
        items.push(formattedShutterSpeed)
      }
    }
    if (fStop) {
      items.push(`ƒ/${fStop}`)
    }
    if (focalLength) {
      items.push(`${focalLength}mm`)
    }
    if (iso) {
      items.push(`ISO ${iso}`)
    }

    return items.join(' — ')
  }

  return ''
}
