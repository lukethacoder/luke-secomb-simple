import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout'
import { colors } from '../_variables'

const NotFoundPage = () => (
  <Layout>
    <Error>
      <div>
        <h1>404 no page here</h1>
        <p>You should checkout this <Link to="work/any-ideas">project</Link></p>
      </div>
    </Error>
  </Layout>
)

export default NotFoundPage

const Error = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  align-content: center;
  justify-content: center;
  div {
    margin: 0 auto;
    max-width: 90%;
    height: 50%;
    h1 {
      color: ${colors.gold};
    }
    p {
      color: ${colors.white};
      a {
        color: ${colors.gold};
      }
    }
  }
`