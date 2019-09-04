import * as React from 'react'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import TopLeftText from '../components/TopLeftText'
import Button from '../components/Button'
import { widths } from '../styles/variables'

const AboutPage = () => (
  <IndexLayout>
    <Page>
      <TopLeftText text="hello." />
      <Container>
        <div style={{ maxWidth: `${widths.md}px` }}>
          <h1 style={{ fontWeight: '400', padding: '48px 0 24px' }}>Who is this?</h1>
          <p style={{ margin: '0 0 64px' }}>
            I currently work at Soda Strategic as a Web Developer and pride myself on delivering beautiful and user friendly experiences. I
            enjoy learning about new web technologies/frameworks and experimenting with various tools to get places I maybe should quite be.
          </p>
          <Button text="Delve into my side projects" link="/projects" isInternal />
        </div>
      </Container>
    </Page>
  </IndexLayout>
)

export default AboutPage
