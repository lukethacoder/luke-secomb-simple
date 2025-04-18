import type { APIContext } from 'astro'
import { generateFeed } from '../../lib/feeds/photography'

export async function GET(context: APIContext) {
  const feed = await generateFeed(context)
  return new Response(feed.atom1(), {
    headers: { 'Content-Type': 'application/xml' },
  })
}
