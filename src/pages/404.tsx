import * as React from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import { colors } from '../styles/variables'
import TopLeftText from '../components/TopLeftText'
import Button from '../components/Button'

const NotFoundPage = () => (
  <IndexLayout>
    <Page>
      <TopLeftText text="damn." />
      <Container>
        <h1 style={{ fontWeight: '700' }}>404</h1>
        <p style={{ color: colors.brand, margin: '0 0 48px' }}>
          you've hacked my site. <br />
          congratulations
        </p>
        <Button text="Back to safety" link="/" isInternal />
      </Container>
    </Page>
  </IndexLayout>
)

export default NotFoundPage
