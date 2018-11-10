import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../../components/layout'
import WorkHeader from '../../components/work/header'
import styled from 'styled-components'

import { colors } from '../../_variables.js'

const item_data = {
  "image": "https://australianroundhouses.com.au/static/c309b0c8dc5b91cd6463726b57426a4b-3128194e46f4afc0a41ca9b4c9c09fc8-80561.jpg",
  "title": "Australian Roundhouses",
  "intro": "Lorem ipsum dolor amet hell of lyft put a bird on it distillery yuccie photo booth readymade drinking vinegar thundercats bespoke slow-carb asymmetrical. Ugh fixie snackwave franzen, church-key vice fingerstache portland hexagon pop-up chartreuse thundercats gochujang 90's prism. Trust fund viral schlitz raclette jean shorts taiyaki before they sold out.",
  "categories": ["PHP", "WordPress"],
  "github": "https://github.com/lukethacoder/wp-webhook-deploy-netlify",
}

const AustralianRoundhouses = () => (
  <Layout>
    <WorkHeader data={item_data}/>
    <WorkItemContainer>
      <p>content goes here</p>
      <p>image component goes here on click full screen that bad boi</p>
      <StaticQuery
        query={graphql`
          query {
            placeholderImage: file(relativePath: { eq: "any-ideas/logo.jpg" }) {
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        `}
        render={data => 
          <Img fluid={data.placeholderImage.childImageSharp.fluid} />
          // console.log('data ', data)
        }
      />
    </WorkItemContainer>
  </Layout>
)

export default AustralianRoundhouses


const WorkItemContainer = styled.section`
  z-index: 10;
  padding: 64px 148px;
  p {
    color: ${colors.white};
    opacity: .85;
    max-width: 768px;
  }
`

// images
// const Image01 = () => (
//   <StaticQuery
//     query={graphql`
//       query {
//         placeholderImage: file(relativePath: { eq: "any-ideas/logo.jpg" }) {
//           childImageSharp {
//             fluid(maxWidth: 300) {
//               ...GatsbyImageSharpFluid
//             }
//           }
//         }
//       }
//     `}
//     render={data => <Img fluid={data.placeholderImage.childImageSharp.fluid} />}
//   />
// )
