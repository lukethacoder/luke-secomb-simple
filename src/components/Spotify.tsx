import * as React from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import axios from 'axios'

import { widths, colors } from '../styles/variables'
import { rem, trans, no_select } from '../styles/mixins'

interface SpotifyObj {
  recenttracks: {
    track: Array<any>
  }
}

const API_KEY: any = 'ae1689ceac2d61e7cf4fd57595057671'

function fetchDataFromAxios(url: string) {
  // You can await here
  const result = axios(url)
  return result
}

const Spotify: React.SFC = () => {
  const [spotifyData, setSpotifyData]: any = React.useState<SpotifyObj | null>(null)

  if (typeof window !== undefined) {
    React.useEffect(() => {
      let didCancel = false

      async function fetchMyAPI() {
        let url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=lu_ke____&api_key=${API_KEY}&format=json`
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
  }

  return (
    <StyledSpotify>
      <p>{spotifyData ? (spotifyData.track[0]['@attr'] ? 'currently playing.' : 'last played.') : ''}</p>
      <img src={`${spotifyData ? spotifyData.track[0].image[spotifyData.track[0].image.length - 1]['#text'] : ''}`} />
      <div>
        <h5>{spotifyData ? spotifyData.track[0].name : ''}</h5>
        <h6>{spotifyData ? spotifyData.track[0].artist['#text'] : ''}</h6>
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
    min-height: 48px;
    min-width: 48px;
    max-width: 48px;
    max-height: 48px;
    width: 100%;
    height: 100%;
    background-color: ${colors.gradientEnd};
    border: 1px solid ${colors.white};
  }
  div {
    padding: 0 64px 0 24px;
    width: 100%;
    h5 {
      font-size: 12px;
      margin: 0 0 4px;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
      color: ${colors.white};
      transition: all 0.3s ease;
      max-width: 100%;
      &:hover {
        overflow: visible;
        transition: all 0.3s ease;
      }
    }
    h6 {
      font-size: 12px;
      margin: 0;
      color: ${colors.grey.base};
    }
  }
`
