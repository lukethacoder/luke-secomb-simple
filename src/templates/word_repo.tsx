import * as React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from '@emotion/styled'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

import { colors } from '../styles/variables'
import { trans, rem } from '../styles/mixins'

interface WordRepoTemplateProps {
  data: {
    markdownRemark: {
      html: string
      excerpt: string
      frontmatter: {
        title: string
        tags: Array<string>
        category: string
      }
    }
  }
}

const WordRepoTemplate: React.SFC<WordRepoTemplateProps> = ({ data }) => (
  <IndexLayout>
    <Page>
      <Container>
        <h1>{data.markdownRemark.frontmatter.title}</h1>
        <ContentTags>
          {data.markdownRemark.frontmatter.tags.map(tag => (
            <p>{tag}</p>
          ))}
        </ContentTags>
        <PageContent dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </Container>
    </Page>
  </IndexLayout>
)

export default WordRepoTemplate

export const query = graphql`
  query WordRepoTemplateQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        category
        tags
        gallery {
          childImageSharp {
            sizes(maxWidth: 1080) {
              ...GatsbyImageSharpSizes_tracedSVG
            }
          }
        }
        image {
          childImageSharp {
            sizes(maxWidth: 1080) {
              ...GatsbyImageSharpSizes_tracedSVG
            }
          }
        }
      }
    }
  }
`

const ContentTags = styled.div`
  color: ${colors.grey.base};
  display: flex;
  width: 100%;
  p {
    float: left;
    margin-right: 8px;
  }
`
const PageContent = styled.div`
  color: ${colors.white};
  max-width: 740px;
  p {
    font-size: ${rem(16)}rem;
  }
`
