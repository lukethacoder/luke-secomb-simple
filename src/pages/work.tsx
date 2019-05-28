import * as React from 'react'
import styled from '@emotion/styled'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import Button from '../components/Button'
import TopLeftText from '../components/TopLeftText'

import { colors, breakpoints } from '../styles/variables'
import { trans } from '../styles/mixins'
import { Slugify } from '../helpers/helpers'

interface WorkItemObj {
  node: {
    html: HTMLElement
    excerpt: string
    frontmatter: {
      title: string
      category: string
      image: any
      slug: string
      date?: string
      published: boolean
    }
  }
}
interface WorkItemObjData {
  data: WorkItemObj
}

interface PageTemplateProps {
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
    allMarkdownRemark: {
      edges: WorkItemObj[]
    }
  }
}

const RenderWorkItem: React.SFC<WorkItemObjData> = ({ data }) => {
  const item = data.node.frontmatter
  if (!item.published || !item.image) {
    return null
  }
  return (
    <WorkItem to={`${item.category}/${item.slug}`}>
      <div className="image_wrapper">
        <Img sizes={item.image.childImageSharp.sizes} />
      </div>
    </WorkItem>
  )
}

const WorksPage: React.FunctionComponent<PageTemplateProps> = ({ data }) => {
  return (
    <IndexLayout>
      <Page>
        <TopLeftText text="work." />
        <Container>
          <h1 style={{ fontWeight: '400', padding: '48px 0 64px' }}>
            i got paid <br />
            for these.
          </h1>
          <WorksContainer>
            {data.allMarkdownRemark.edges.map((item: WorkItemObj) => (
              <RenderWorkItem data={item} key={Slugify(item.node.frontmatter.title)} />
            ))}
          </WorksContainer>
          <Button text="Keen for a chat?" link="/contact" isInternal />
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default WorksPage

export const query = graphql`
  query WorksPageTemplateQuery {
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: { frontmatter: { category: { eq: "work" } } }) {
      edges {
        node {
          html
          excerpt
          frontmatter {
            title
            category
            slug
            date
            image {
              childImageSharp {
                sizes(maxWidth: 1080) {
                  ...GatsbyImageSharpSizes_tracedSVG
                }
              }
            }
            published
          }
        }
      }
    }
  }
`
const WorksContainer = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 24px;
  width: 100%;
  margin: 0 0 64px;
  padding: 0;
  @media (min-width: ${breakpoints.md}px) {
    padding: 0 24px 0 0;
  }
  @media (min-width: ${breakpoints.lg}px) {
    grid-template-columns: 50% 50%;
  }
`

const WorkItem = styled(Link)`
  /* background-color: #f4f4f4; */
  display: flex;
  width: 100%;
  height: 228px;
  min-height: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  border: 2px solid ${colors.brand};
  transition: ${trans};
  &:hover {
    border: 2px solid ${colors.white};
    transition: ${trans};
  }
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
