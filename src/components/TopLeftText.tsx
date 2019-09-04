import * as React from 'react'
import styled from '@emotion/styled'

import { colors, breakpoints } from '../styles/variables'
import { rem } from '../styles/mixins'

const TopLeftTextComponent = styled.h6`
  position: relative;
  padding: ${rem(84)}em 0px ${rem(8)}em ${rem(10)}em;
  width: auto;
  margin: 0;
  font-size: ${rem(12)}em;
  @media (min-width: ${breakpoints.md}px) {
    padding: ${rem(56)}em 0px ${rem(8)}em ${rem(168)}em !important;
  }
  @media (prefers-color-scheme: light) {
    color: ${colors.darkGrey};
  }
  hr {
    background-color: ${colors.white};
    max-width: 40px;
    margin: 0.75rem 0 1.5rem;
    @media (prefers-color-scheme: light) {
      background-color: ${colors.darkGrey};
    }
  }
`

interface ButtonProps {
  text: string
}

const TopLeftText: React.SFC<ButtonProps> = ({ text }) => {
  return (
    <TopLeftTextComponent>
      {text}
      <hr />
    </TopLeftTextComponent>
  )
}

export default TopLeftText
