import * as React from 'react'
import styled from '@emotion/styled'

import { colors, breakpoints } from '../styles/variables'
import { getEmSize } from '../styles/mixins'

const TopLeftTextComponent = styled.h6`
  position: relative;
  padding: ${getEmSize(128)}em 0px ${getEmSize(8)}em ${getEmSize(10)}em;
  width: auto;
  margin: 0;
  font-size: ${getEmSize(12)}em;
  @media (min-width: ${breakpoints.md}px) {
    padding: ${getEmSize(128)}em 0px ${getEmSize(8)}em ${getEmSize(168)}em !important;
  }
  hr {
    background-color: ${colors.white};
    max-width: 40px;
    margin: 0.75rem 0 1.5rem;
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
