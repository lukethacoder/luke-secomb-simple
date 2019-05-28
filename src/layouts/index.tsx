import * as React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import { useSpring, animated } from 'react-spring'

import 'modern-normalize'
import '../styles/normalize'

import Header from '../components/Header'
import Footer from '../components/Footer'
import LayoutRoot from '../components/LayoutRoot'
import LayoutMain from '../components/LayoutMain'

type StaticQueryProps = {
  site: {
    siteMetadata: {
      title: string
      description: string
    }
  }
}

const IndexLayout: React.SFC = ({ children }) => {
  const fade = useSpring({
    from: {
      opacity: 0,
      transform: 'translate(24px, 0px)',
    },
    opacity: 1,
    transform: 'translate(0px, 0px)',
  })

  console.log(fade)

  return (
    <StaticQuery
      query={graphql`
        query IndexLayoutQuery {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={(data: StaticQueryProps) => (
        <LayoutRoot>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: data.site.siteMetadata.description },
              { name: 'keywords', content: 'gatsbyjs, gatsby, javascript, sample, something' },
            ]}
          />
          <Header title={data.site.siteMetadata.title} />
          <LayoutMain>
            <animated.div style={fade}>{children}</animated.div>
          </LayoutMain>
          {/* <Footer /> */}
        </LayoutRoot>
      )}
    />
  )
}

export default IndexLayout
