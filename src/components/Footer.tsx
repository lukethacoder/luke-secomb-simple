import * as React from 'react'
import styled from '@emotion/styled'

import Spotify from './Spotify'

import { widths, colors, breakpoints } from '../styles/variables'

const Footer: React.SFC = () => {
  return (
    <FooterContainer>
      {/* <p>hello.</p> */}
      <FooterWrapper>{/* <Spotify /> */}</FooterWrapper>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.div`
  height: 0;
  color: ${colors.brand};
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  max-width: 100vw;
  width: 100%;
  display: flex;
  height: 0;
  > p {
    text-align: center;
    width: 100%;
    position: absolute;
    padding: 64px 0 24px;
    bottom: -72px;
    margin: 0;
    transition: all 0.3s ease;
    cursor: pointer;
    font-weight: bold;
    color: ${colors.brand};
    &:hover {
      bottom: 0;
      transition: all 0.3s ease;
    }
  }
`
const FooterWrapper = styled.div`
  height: 100%;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  bottom: -20px;
  @media (min-width: ${breakpoints.md}px) {
    max-height: 100vh;
    opacity: 1;
    bottom: 0;
  }
`
