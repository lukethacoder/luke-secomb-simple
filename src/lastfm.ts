export interface LastFmApiResponse {
  recenttracks: {
    track: Track[]
    '@attr': Attr2
  }
}

interface Track {
  artist: Artist
  streamable: string
  image: Image[]
  mbid: string
  album: Album
  name: string
  '@attr'?: Attr
  url: string
  date?: Date
}

interface Artist {
  mbid: string
  '#text': string
}

interface Image {
  size: string
  '#text': string
}

interface Album {
  mbid: string
  '#text': string
}

interface Attr {
  nowplaying: string
}

interface Date {
  uts: string
  '#text': string
}

interface Attr2 {
  user: string
  totalPages: string
  page: string
  perPage: string
  total: string
}
