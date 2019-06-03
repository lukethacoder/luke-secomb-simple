import * as React from 'react'
import styled from '@emotion/styled'

import { widths, breakpoints } from '../styles/variables'
import { rem } from '../styles/mixins'

const StyledContainer = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: auto;
  max-width: ${rem(widths.lg)}em;
  @media (min-width: ${breakpoints.md}px) {
    margin-left: ${rem(224)}em;
  }
`

interface ContainerProps {
  className?: string
}

const Container: React.SFC<ContainerProps> = ({ children, className }) => (
  <StyledContainer className={className}>{children}</StyledContainer>
)

export default Container
