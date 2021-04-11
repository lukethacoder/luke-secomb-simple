import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { LayoutPrimary } from 'layouts'
import { Banner, Card, Scrobbler, WorkTypeToggle } from 'components'

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
                description
                devDescription
                url
                imageMain {
                  childImageSharp {
                    gatsbyImageData(
                      width: 600
                      placeholder: BLURRED
                      formats: [AUTO, WEBP, AVIF]
                    )
                  }
                }
                imageLogo {
                  childImageSharp {
                    gatsbyImageData(
                      width: 100
                      placeholder: DOMINANT_COLOR
                      formats: [AUTO, WEBP, AVIF]
                    )
                  }
                }
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

  console.log(`clientWork  `, clientWork)
  console.log(`sideProjectWork `, sideProjectWork)

  return (
    <LayoutPrimary>
      <div className='grid grid-cols-12 flex-1'>
        <div className='mt-8 md:mt-32 lg:mt-40 col-span-12 lg:col-span-4 xl:col-span-5 pr-8 flex flex-col'>
          <Banner />
          <div className='mt-12'>
            <WorkTypeToggle />
          </div>
          <div className='flex-1 hidden lg:flex items-end mb-12'>
            <Scrobbler />
          </div>
        </div>
        <div className='col-span-12 lg:col-span-8 xl:col-span-7 h-full overflow-auto pb-8 relative'>
          <ul className='col-count-1 md:col-count-2 lg:col-count-1 xl:col-count-2 col-gap-16 pr-4'>
            {clientWork.map((item, key) => (
              <li
                key={item.title}
                className={`w-full bi-avoid mb-8 ${
                  key === 1 ? 'mt-24' : 'mt-8 md:mt-24'
                }`}
              >
                <Card
                  title={item.title}
                  description={item.description}
                  devDescription={item.devDescription}
                  url={item.url}
                  imageMain={item.imageMain}
                  imageLogo={item.imageLogo}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </LayoutPrimary>
  )
}

export default IndexPage
