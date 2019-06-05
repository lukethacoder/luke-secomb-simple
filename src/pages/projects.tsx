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

interface ProjectItemObj {
  node: {
    html: HTMLElement
    excerpt: string
    frontmatter: {
      title: string
      category: string
      image?: unknown
      slug: string
      published: boolean
    }
  }
}
interface ProjectItemData {
  data: ProjectItemObj
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
      edges: ProjectItemObj[]
    }
  }
}

const RenderProjectItem: React.SFC<ProjectItemData> = ({ data }) => {
  const item = data.node.frontmatter
  if (!item.published) {
    return null
  }
  return (
    <ProjectItem to={`${item.category}/${item.slug}`}>
      <div className="image_wrapper">
        <Img sizes={item.image.childImageSharp.sizes} />
      </div>
    </ProjectItem>
  )
}
// projects_data.forEach((project_item: any) => <h1>${project_item.node.frontmatter.title}</h1>

const ProjectsPage: React.FunctionComponent<PageTemplateProps> = ({ data }) => {
  return (
    <IndexLayout>
      <Page>
        <TopLeftText text="projects" />
        <Container>
          <h1 style={{ fontWeight: '400', padding: '48px 0 64px' }}>
            just a bit of fun. <br />
            side projects & hacks.
          </h1>
          <ProjectsContainer>
            {data.allMarkdownRemark.edges.map((item: ProjectItemObj) => (
              <RenderProjectItem data={item} key={item.node.frontmatter.title} />
            ))}
          </ProjectsContainer>
          <Button text="See projects I have been paid for" link="/work" isInternal />
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default ProjectsPage

export const query = graphql`
  query ProjectsPageTemplateQuery {
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
    allMarkdownRemark(sort: { fields: [frontmatter___order], order: ASC }, filter: { frontmatter: { category: { eq: "projects" } } }) {
      edges {
        node {
          html
          excerpt
          frontmatter {
            title
            category
            slug
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
const ProjectsContainer = styled.div`
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

const ProjectItem = styled(Link)`
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
