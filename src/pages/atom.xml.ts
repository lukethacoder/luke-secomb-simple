import type { APIContext } from 'astro'
import { generateFeed } from '../lib/feeds/all'

export async function GET(context: APIContext) {
  const feed = await generateFeed(context)
  return new Response(feed.atom1(), {
    headers: { 'Content-Type': 'application/xml' },
  })
}
