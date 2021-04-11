import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { LayoutPrimary } from 'layouts'
import { Banner, Scrobbler, WorkTypeToggle } from 'components'

const IndexPage = () => {
  // TODO: handle toggle between client work/side projects
  const data = useStaticQuery(graphql`
    query AllContentQuery {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        group(field: frontmatter___type) {
          edges {
            node {
              frontmatter {
                date
                type
                published
                slug
                title
                url
              }
            }
          }
          fieldValue
        }
      }
    }
  `)

  const getFrontmatter = (node) => {
    const {
      node: { frontmatter: data },
    } = node
    return { ...data }
  }

  const clientWork = []
  const sideProjectWork = []
  // loop over each markdown content type, and push the nodes to the respective arrays
  data.allMarkdownRemark.group.forEach((contentType) => {
    const items = contentType.edges
    if (contentType.fieldValue === 'client') {
      items.forEach((item) => {
        clientWork.push(getFrontmatter(item))
      })
    } else if (contentType.fieldValue === 'project') {
      items.forEach((item) => {
        sideProjectWork.push(getFrontmatter(item))
      })
    }
  })

  console.log(`clientWork `, clientWork)
  console.log(`sideProjectWork `, sideProjectWork)

  return (
    <LayoutPrimary>
      <div className='grid grid-cols-12 flex-1'>
        <div className='md:mt-40 col-span-5 pr-8 flex flex-col'>
          <Banner />
          <div className='mt-12'>
            <WorkTypeToggle />
          </div>
          <div className='flex-1 flex items-end mb-12'>
            <Scrobbler />
          </div>
        </div>
        <div className='col-span-7'>
          <ul>
            <li>test</li>
            <li>tes</li>
            <li>te</li>
            <li>t</li>
          </ul>
        </div>
      </div>
    </LayoutPrimary>
  )
}

export default IndexPage
