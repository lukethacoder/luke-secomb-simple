import * as React from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import TopLeftText from '../components/TopLeftText'
import Button from '../components/Button'
import { colors, widths } from '../styles/variables'

const links: Array<any> = [
  {
    title: 'VS Code Default Workspace Settings',
    url: 'https://gist.github.com/lukethacoder/eecfc34c9c2bc63e87947d55d5b8b78',
  },
  {
    title: 'Fix WP DB on Windows',
    url: 'https://gist.github.com/lukethacoder/d530a1cbd410f4190caab1cde49e1084',
  },
]

const DevPage = () => {
  return (
    <IndexLayout>
      <Page>
        <TopLeftText text="dev." />
        <Container>
          <div style={{ maxWidth: `${widths.md}px` }}>
            <h1 style={{ fontWeight: '400', padding: '48px 0 24px' }}>Tools n Snippets</h1>
            <h4 style={{ color: colors.white, fontWeight: '400', padding: '0 0 16px' }}>
              From one dev to another, have some code/settings/snippets.
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', color: colors.white, margin: '0 0 64px' }}>
              {links.map((item: any) => (
                <a href={item.url} target="_blank">
                  {item.title}
                </a>
              ))}
            </div>
            <Button text="Back home" link="/" isInternal />
          </div>
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default DevPage
