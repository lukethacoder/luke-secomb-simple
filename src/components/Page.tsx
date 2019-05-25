import * as React from 'react'
import styled from '@emotion/styled'

import { dimensions } from '../styles/variables'

const StyledPage = styled.div`
  display: block;
  flex: 1;
  position: relative;
  padding: ${dimensions.containerPadding}rem;
  margin-bottom: 3rem;
  /* height: calc(100vh - 48px * 6);
  overflow: auto; */
`

interface PageProps {
  className?: string
}

const Page: React.SFC<PageProps> = ({ children, className }) => <StyledPage className={className}>{children}</StyledPage>

export default Page
