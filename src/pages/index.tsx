import * as React from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import TopLeftText from '../components/TopLeftText'
import Button from '../components/Button'
import { colors, widths } from '../styles/variables'

const IndexPage = () => (
  <IndexLayout>
    <Page>
      <TopLeftText text="nice to meet you" />
      <Container>
        <div style={{ maxWidth: `${widths.md}px` }}>
          <h1 style={{ fontWeight: '400', padding: '48px 0 24px' }}>
            Hey, I'm <span style={{ fontWeight: '700' }}>Luke Secomb</span>, web developer and photographic connoisseur.
          </h1>
          <p style={{ color: colors.white, margin: '0 0 64px' }}>
            I currently work at Soda Strategic as a Web Developer and pride myself on delivering beautiful and user friendly experiences. I
            enjoy learning about new web technologies/frameworks and experimenting with various tools to get places I maybe should quite be.
          </p>
          <Button text="Get to know me" link="/about" isInternal />
        </div>
      </Container>
    </Page>
  </IndexLayout>
)

export default IndexPage
