import * as React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from '@emotion/styled'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

import { colors } from '../styles/variables'
import { trans } from '../styles/mixins'

interface ProjectTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: {
          name: string
          url: string
        }
      }
    }
    markdownRemark: {
      html: string
      excerpt: string
      frontmatter: {
        title: string
        category: string
        image: any
      }
    }
  }
}

const ProjectTemplate: React.SFC<ProjectTemplateProps> = ({ data }) => (
  <IndexLayout>
    <Page>
      <Container>
        {console.log(data.markdownRemark.frontmatter.image.childImageSharp.sizes)}
        <Link to={data.markdownRemark.frontmatter.category}>back</Link>
        <ProjectItem>
          <div className="image_wrapper">
            <Img sizes={data.markdownRemark.frontmatter.image.childImageSharp.sizes} />
          </div>
        </ProjectItem>
        <h1>{data.markdownRemark.frontmatter.title}</h1>
        <PageContent dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </Container>
    </Page>
  </IndexLayout>
)

export default ProjectTemplate

export const query = graphql`
  query ProjectTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        category
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

const PageContent = styled.div`
  color: ${colors.white};
  max-width: 740px;
`
const ProjectItem = styled.div`
  /* background-color: #f4f4f4; */
  display: flex;
  width: 100%;
  max-width: 480px;
  margin: 24px 0 48px;
  height: 228px;
  min-height: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  border: 2px solid ${colors.brand};
  transition: ${trans};
  .image_wrapper {
    height: 100%;
    width: 100%;
    max-height: calc(100% - 32px);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px;
    overflow: hidden;
    .gatsby-image-wrapper {
      width: 100%;
      height: 100%;
    }
  }
`
