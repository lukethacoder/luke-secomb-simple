import * as React from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import axios from 'axios'

import { widths, colors } from '../styles/variables'
import { getEmSize, trans, no_select } from '../styles/mixins'

interface SpotifyObj {
  recenttracks: {
    track: Array<any>
  }
}

const API_KEY: any = process.env.LAST_FM_API_KEY

function fetchDataFromAxios(url: string) {
  // You can await here
  const result = axios(url)
  return result
}

const Spotify: React.SFC = () => {
  const [spotifyData, setSpotifyData]: any = React.useState<SpotifyObj | null>(null)

  console.log('API_KEY', API_KEY)
  console.warn('process.env.GATSBY_LAST_FM_API_KEY', process.env.GATSBY_LAST_FM_API_KEY)
  console.warn('process.env.LAST_FM_API_KEY', process.env.LAST_FM_API_KEY)

  React.useEffect(() => {
    let didCancel = false

    async function fetchMyAPI() {
      let url = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=lu_ke____&api_key=${API_KEY}&format=json`
      const response: any = await fetchDataFromAxios(url)
      if (!didCancel) {
        setSpotifyData(response.data.recenttracks)
      }
    }

    fetchMyAPI()
    return () => {
      didCancel = true
    } // Remember if we start fetching something else
  }, [])

  return (
    <StyledSpotify>
      <p>{spotifyData ? (spotifyData.track[0]['@attr'] ? 'currently playing.' : 'last played.') : ''}</p>
      <img src={`${spotifyData ? spotifyData.track[0].image[spotifyData.track[0].image.length - 1]['#text'] : ''}`} />
      <div>
        <h5>{spotifyData ? spotifyData.track[0].name : 'loading'}</h5>
        <h6>{spotifyData ? spotifyData.track[0].artist['#text'] : 'loading'}</h6>
      </div>
    </StyledSpotify>
  )
}

export default Spotify

const StyledSpotify = styled.div`
  color: ${colors.brand};
  position: absolute;
  bottom: 24px;
  left: 24px;
  z-index: 10000;
  max-width: 100vw;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 208px;
  p {
    position: absolute;
    top: -28px;
    left: 0;
    font-size: 12px;
    font-weight: bold;
  }
  img {
    width: 64px;
    background-color: ${colors.black};
    border: 1px solid ${colors.white};
  }
  div {
    margin: 0 auto 0 24px;
    h5 {
      font-size: 12px;
      margin: 0;
    }
    h6 {
      font-size: 12px;
      margin: 0;
    }
  }
`
