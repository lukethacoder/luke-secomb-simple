import * as React from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import TopLeftText from '../components/TopLeftText'
import Button from '../components/Button'
import { colors, widths } from '../styles/variables'

const DevPage = () => (
  <IndexLayout>
    <Page>
      <TopLeftText text="dev." />
      <Container>
        <div style={{ maxWidth: `${widths.md}px` }}>
          <h1 style={{ fontWeight: '400', padding: '48px 0 24px' }}>Tools n Snippets</h1>
          <h4 style={{ color: colors.white, fontWeight: '400', padding: '0 0 16px' }}>
            From one dev to another, have some settings/snippets.
          </h4>
          <div style={{ color: colors.white, margin: '0 0 64px' }}>
            <a href="https://gist.github.com/lukethacoder/eecfc34c9c2bc63e87947d55d5b8b786" target="_blank">
              VS Code Default Workspace Settings
            </a>
          </div>
          {/* <h4 style={{ color: colors.white, fontWeight: '400', padding: '0 0 16px' }}>Useful Links</h4>
          <div style={{ color: colors.white, margin: '0 0 64px' }}>
            <a href="https://gist.github.com/lukethacoder/eecfc34c9c2bc63e87947d55d5b8b786" target="_blank">
              VS Code Default Workspace Settings
            </a>
          </div> */}
          <Button text="Back home" link="/" isInternal />
        </div>
      </Container>
    </Page>
  </IndexLayout>
)

export default DevPage
