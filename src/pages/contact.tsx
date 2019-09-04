import * as React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import TopLeftText from '../components/TopLeftText'
import Button from '../components/Button'
import { colors, widths } from '../styles/variables'

const ContactOptionsData: Array<object> = [
  {
    type: 'email',
    text: 'hello@lukesecomb.digital',
    url: 'hello@lukesecomb.digital',
  },
  {
    type: 'github',
    text: '@lukethacoder',
    url: 'https://github.com/lukethacoder',
  },
  {
    type: 'linkedin',
    text: 'linkedin.com/in/luke-secomb',
    url: 'https://linkedin.com/in/luke-secomb',
  },
  {
    type: 'instagram',
    text: '@lukesecombdigital',
    url: 'https://instagram.com/lukesecombdigital',
  },
]

const ContactPage = () => (
  <IndexLayout>
    <Page>
      <TopLeftText text="Keen for a coffee & chat." />
      <Container>
        <div style={{ maxWidth: `${widths.md}px` }}>
          <h1 style={{ fontWeight: '400', padding: '48px 0 128px' }}>
            get in touch, <br />
            or stalk me.
          </h1>
          <ContactOptions>
            {ContactOptionsData.map((item: any) => (
              <li>
                <p>{item.type}</p>
                <a href={item.url}>{item.text}</a>
              </li>
            ))}
          </ContactOptions>
          <Button text="fancy a read?" link="/word_repo" isInternal />
        </div>
      </Container>
    </Page>
  </IndexLayout>
)

export default ContactPage

const ContactOptions = styled.li`
  display: grid;
  grid-template-columns: 50% 50%;
  list-style: none;
  grid-gap: 42px 24px;
  margin: 0 0 48px;
  li {
    p {
      color: ${colors.grey.base};
      font-weight: '700';
      margin: 0;
    }
    a {
      color: ${colors.white};
      font-weight: '700';
      @media (prefers-color-scheme: light) {
        color: ${colors.darkGrey};
      }
    }
  }
`
