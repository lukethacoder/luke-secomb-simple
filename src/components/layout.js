import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { colors } from '../_variables.js'

import './layout.css'
require('typeface-raleway')

class Layout extends Component {
  render() {
    return (
      <LayoutContainer>
        <Helmet
          title="Luke Secomb | Web Developer / Photographer / Digital Designer"
          meta={[
            { name: 'description', content: 'I currently work at Soda Strategic as a Web Developer. I pride myself on delivering beautiful and user friendly experiences. I enjoy learning about new web technologies/frameworks and experimenting with various tools to make pixels look good.' },
            { name: 'keywords', content: 'Luke Secomb' },
          ]}
        >
        </Helmet>
        <HeadBar>
          <Link to="/">
            <div className="logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 226.86"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path className="cls-1" d="M106.94,22.24,19.24,59l87.7,37v22.24L0,71.71V46.48L106.94,0Z"/><path className="cls-2" d="M243.06,204.62l87.7-36.73-87.7-37V108.67L350,155.15v25.24L243.06,226.86Z"/><path className="cls-3" d="M242.6,0Q151.42,151.75,136.33,178.45t-15.09,35.39q0,9.77,8.26,9.77,18.25,0,67-68.93,1.08-2.17,2.61-2.17a1.16,1.16,0,0,1,.87,1.3q0,1.3-2.17,3.47l-9.35,12.83q-41.09,56.74-60.64,56.74a19.19,19.19,0,0,1-15.32-7.06q-6-7.06-6-17.91A51.52,51.52,0,0,1,112,178.78q5.54-11.18,37.67-64.59Q189,48.85,215.89.87Z"/></g></g></svg>
            </div>
          </Link>
          {/* <div className="nav">
            site nav / socials
          </div> */}
        </HeadBar>
        <ChildContainer>
          {this.props.children}
        </ChildContainer>
      </LayoutContainer>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

const ChildContainer = styled.div`
  /* overflow: scroll; */
`

const LayoutContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;

  font-family: 'Raleway', sans-serif;

  background: rgba(20,20,20,1);
  background: -moz-linear-gradient(-45deg, rgba(20,20,20,1) 0%, rgba(44,44,44,1) 100%);
  background: -webkit-gradient(left top, right bottom, color-stop(0%, rgba(20,20,20,1)), color-stop(100%, rgba(44,44,44,1)));
  background: -webkit-linear-gradient(-45deg, rgba(20,20,20,1) 0%, rgba(44,44,44,1) 100%);
  background: -o-linear-gradient(-45deg, rgba(20,20,20,1) 0%, rgba(44,44,44,1) 100%);
  background: -ms-linear-gradient(-45deg, rgba(20,20,20,1) 0%, rgba(44,44,44,1) 100%);
  background: linear-gradient(135deg, rgba(20,20,20,1) 0%, rgba(44,44,44,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#141414', endColorstr='#2c2c2c', GradientType=1 );
`

const HeadBar = styled.div`
  width: 100%;
  padding: 48px;
  max-height: 124px;
  position: absolute;
  .logo {
    max-height: 68px;
    max-width: 68px;
    svg {
      width: 100%;
      height: 100%;
      fill: ${colors.gold};
    }
  }
`