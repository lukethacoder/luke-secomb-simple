import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Img } from 'gatsby-image'

import Layout from '../../components/layout'
import WorkHeader from '../../components/work/header'
import styled from 'styled-components'

import { colors, weight } from '../../_variables.js'

const item_data = {
  "image": "https://scontent-syd2-1.cdninstagram.com/vp/eaa76bf63971ab5cd5b2cf52f42e9373/5C7ED5EF/t51.2885-15/fr/e15/s1080x1080/43736954_2021637617882576_2137828474612103556_n.jpg",
  "title": "any.ideas",
  "intro": "Lorem ipsum dolor amet hell of lyft put a bird on it distillery yuccie photo booth readymade drinking vinegar thundercats bespoke slow-carb asymmetrical. Ugh fixie snackwave franzen, church-key vice fingerstache portland hexagon pop-up chartreuse thundercats gochujang 90's prism. Trust fund viral schlitz raclette jean shorts taiyaki before they sold out.",
  "categories": ["Laravel", "Vue"],
  "github": "https://github.com/HurricaneInteractive/anyideas",
  // "website": "website_url",
}

// TO-DO stringify code to be able to add a variable to the relativePath / parse back into valid js code to fetch the data

const AnyIdeas = () => (
  <Layout>
    <WorkHeader data={item_data}/>
    <WorkItemContainer>
      <p>content goes here</p>
      <p>image component goes here (on click full screen that bad boi)</p>
      {/* <Image image="any-ideas/any-ideas-logo.png"/> */}
      <Image01/>
      <p>image component goes here (on click full screen that bad boi)</p>
    </WorkItemContainer>
  </Layout>
)

export default AnyIdeas


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
const Image01 = () => (
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
    render={data => <Img fluid={data.placeholderImage.childImageSharp.fluid} />}
  />
)
