import * as React from 'react'
import styled from '@emotion/styled'

import Spotify from './Spotify'

import { widths, colors, breakpoints } from '../styles/variables'
import { rem, trans } from '../styles/mixins'
import { Link } from 'gatsby'

const Footer: React.SFC = () => {
  return (
    <FooterContainer>
      {/* <p>hello.</p> */}
      <FooterWrapper>
        <Spotify />
        <Link to="/word_repo">word repo.</Link>
      </FooterWrapper>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.div`
  height: 0;
  color: ${colors.brand};
  position: relative;
  bottom: 0;
  left: 0;
  z-index: 100;
  max-width: 100vw;
  width: 100%;
  display: flex;
  height: 0;
  @media (min-width: ${breakpoints.md}px) {
    position: fixed;
  }
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
  max-height: 100vh;
  opacity: 1;
  bottom: -20px;
  @media (min-width: ${breakpoints.md}px) {
    max-height: 100vh;
    bottom: 0;
  }
  a {
    bottom: 42px;
    color: ${colors.white};
    font-weight: 600;
    position: fixed;
    right: 24px;
    font-size: ${rem(16)}rem;
    transition: ${trans};
    &:hover {
      color: ${colors.brand};
      transition: ${trans};
    }
  }
`
