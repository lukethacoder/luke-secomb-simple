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
import { trans, rem } from '../styles/mixins'
import { Slugify } from '../helpers/helpers'

interface WordRepoObj {
  node: {
    html: HTMLElement
    excerpt: string
    frontmatter: FrontmatterProps
  }
}
interface WordRepoData {
  data: WordRepoObj
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
      edges: WordRepoObj[]
    }
  }
}
interface FrontmatterProps {
  title: string
  category: string
  slug: string
  published: boolean
  date: string
  tags?: Array<string>
}

const RenderWordRepo: React.SFC<WordRepoData> = ({ data }) => {
  const item: FrontmatterProps = data.node.frontmatter
  if (!item.published) {
    return null
  }
  let tagsArray: any = item.tags.map((tag: string) => <p>{tag}</p>)
  console.log(tagsArray)
  return (
    <WordRepo to={`${item.category}/${item.slug}`}>
      <div className="content_wrapper">
        <div className="tags">{tagsArray}</div>
        <h3 className="item_title">{item.title}</h3>
        <p className="date_created">{item.date}</p>
      </div>
    </WordRepo>
  )
}
// projects_data.forEach((project_item: any) => <h1>${project_item.node.frontmatter.title}</h1>

const ProjectsPage: React.FunctionComponent<PageTemplateProps> = ({ data }) => {
  console.log(data.allMarkdownRemark.edges)
  return (
    <IndexLayout>
      <Page>
        <TopLeftText text="word repo." />
        <Container>
          <h1 style={{ fontWeight: '400', padding: '48px 0 64px' }}>
            yes, its a blog. <br />
            code snippets, hacks <br />
            and how-to's.
          </h1>
          <WordRepoContainer>
            {data.allMarkdownRemark.edges.map((item: WordRepoObj) => (
              <RenderWordRepo data={item} key={item.node.frontmatter.title} />
            ))}
          </WordRepoContainer>
          <Button text="...this is the end" link="/" isInternal />
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default ProjectsPage

export const query = graphql`
  query WordRepoPageTemplateQuery {
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
    allMarkdownRemark(sort: { fields: [frontmatter___order], order: ASC }, filter: { frontmatter: { category: { eq: "word_repo" } } }) {
      edges {
        node {
          html
          excerpt
          frontmatter {
            title
            slug
            category
            tags
            date(formatString: "MMMM DD, YYYY")
            published
          }
        }
      }
    }
  }
`
const WordRepoContainer = styled.div`
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

const WordRepo = styled(Link)`
  display: flex;
  width: 100%;
  height: auto;
  overflow: hidden;
  align-items: stretch;
  border: 2px solid ${colors.brand};
  transition: ${trans};
  padding: 24px;
  &:hover {
    border: 2px solid ${colors.white};
    transition: ${trans};
  }
  .content_wrapper {
    height: 100%;
    width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    .tags {
      display: block;
      p {
        float: left;
        color: ${colors.grey.base};
        margin: -2px 4px 0 0;
        font-size: ${rem(12)}rem;
      }
    }
    .item_title {
      color: ${colors.white};
      margin: 8px 0 24px;
      font-size: ${rem(22)}rem;
      font-weight: 700;
    }

    .date_created {
      font-size: ${rem(14)}rem;
      margin: 0;
    }
  }
`
