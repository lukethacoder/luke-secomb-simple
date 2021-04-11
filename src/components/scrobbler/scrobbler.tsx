import * as React from 'react'
import { SpotifyObj } from './scrobbler-types'

const API_KEY = ''
const SCROLLBE_LAST_FM_USER = 'lu_ke____'
const SCROBBLE_URL = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${SCROLLBE_LAST_FM_USER}&api_key=${API_KEY}&format=json`

export const Scrobbler = () => {
  const [spotifyData, setSpotifyData]: any = React.useState<SpotifyObj | null>(
    null
  )

  function fetchCurrentSong() {
    fetch(SCROBBLE_URL)
      .then((response) => response.json())
      .then((resultData) => {
        setSpotifyData(resultData.recenttracks)
      })
  }

  React.useEffect(() => {
    fetchCurrentSong()

    const timer = setInterval(() => {
      fetchCurrentSong()
      // interval to re-check the current track every 2mins
    }, 120000)
    // clearing interval
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <div className='text-xs uppercase mb-1'>
        {spotifyData
          ? spotifyData.track[0]['@attr']
            ? 'Currently playing'
            : 'Last played'
          : ''}
      </div>
      <div className='flex items-end'>
        <img
          className='w-12'
          src={`${
            spotifyData
              ? spotifyData.track[0].image[
                  spotifyData.track[0].image.length - 1
                ]['#text']
              : ''
          }`}
        />
        <div className='ml-2'>
          <p className='text-2xs'>
            {spotifyData ? spotifyData.track[0].name : ''}
          </p>
          <p className='text-2xs font-bold text-tertiary'>
            {spotifyData ? spotifyData.track[0].artist['#text'] : ''}
          </p>
        </div>
      </div>
    </div>
  )
}
