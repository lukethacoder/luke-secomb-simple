// import React from 'react'
// import { StaticQuery, graphql } from 'gatsby'
// import Img from 'gatsby-image'

// import Layout from '../../components/layout'
// import WorkHeader from '../../components/work/header'
// import styled from 'styled-components'

// import { colors } from '../../_variables.js'

// const item_data = {
//   "image": "https://d33wubrfki0l68.cloudfront.net/6e0d672d0e0bd74654ea9867cd34324c9213a020/66160/static/bgimg.43ab0aac.jpg",
//   "title": "Ignite Driving",
//   "intro": "Ignite Driving was built from the ground up. All design and advertising work, as well as the web development was created. The challenge was to reach and engage with the audience using current digital technologies and design thinking strategies",
//   "categories": ["GatsbyJS", "React"],
//   "github": "https://github.com/lukethacoder/wp-webhook-deploy-netlify",
// }

// const IgniteDriving = () => (
//   <Layout>
//     <WorkHeader data={item_data}/>
//     <WorkItemContainer>
//       <p>content goes here</p>
//       <p>image component goes here on click full screen that bad boi</p>
//       <StaticQuery
//         query={graphql`
//           query {
//             placeholderImage: file(relativePath: { eq: "any-ideas/logo.jpg" }) {
//               childImageSharp {
//                 fluid(maxWidth: 300) {
//                   ...GatsbyImageSharpFluid
//                 }
//               }
//             }
//           }
//         `}
//         render={data => 
//           <Img fluid={data.placeholderImage.childImageSharp.fluid} />
//           // console.log('data ', data)
//         }
//       />
//       <h2>The Brand</h2>
//       <p>
//         Based in South Canberra, Ignite Driving is a newly founded small business that aims to help Learner drivers transition to become safe and confident P plate drivers. Through the use of thorough and informative teaching techniques, Ignite driving is putting safer drivers on Canberra roads.
//       </p>
//       <h2>The Project</h2>
//       <p>
//         Starting a brand from scratch is always a difficult process. It began with the design of the logo. Inspired by a flowing flame of sorts the cursive typography of the "ignite" contrasts with the sans serif "driving" type. The overall aesthetic follows hues of purple, oranges, and shades of grey.
//       </p>
//       <h2>The Result</h2>
//       <p>
//         The project has been completed, but is still undergoing review with the development. Small bugs are being thinned out and fixed up - and optimisations are always being developed. Additionally, there is a car wrap design that is in the process of being created. This will be used on the company car and will help it stand out when traveling the roads of Canberra.
//       </p>
//     </WorkItemContainer>
//   </Layout>
// )

// export default IgniteDriving


// const WorkItemContainer = styled.section`
//   z-index: 10;
//   padding: 64px 148px;
//   p {
//     color: ${colors.white};
//     opacity: .85;
//     max-width: 768px;
//   }
// `

// // images
// // const Image01 = () => (
// //   <StaticQuery
// //     query={graphql`
// //       query {
// //         placeholderImage: file(relativePath: { eq: "any-ideas/logo.jpg" }) {
// //           childImageSharp {
// //             fluid(maxWidth: 300) {
// //               ...GatsbyImageSharpFluid
// //             }
// //           }
// //         }
// //       }
// //     `}
// //     render={data => <Img fluid={data.placeholderImage.childImageSharp.fluid} />}
// //   />
// // )
