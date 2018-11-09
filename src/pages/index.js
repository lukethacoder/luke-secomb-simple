import React, { Component } from 'react'
// import { Link } from 'gatsby'
import styled from 'styled-components'

import { colors, weight } from '../_variables.js'
import Layout from '../components/layout'
import Gallery from '../components/gallery'
import Button from '../components/button'

class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      home_view: true
    }
  }

  toggleView() {
    console.log('run toggleView');
    if (this.state.home_view === true) {
      this.setState({
        home_view: false
      })
    } else {
      this.setState({
        home_view: true
      })
    }
  }

  render() {
    return (
      <Layout>
        
        <GoldBar/>
        <GetInTouchLeft>
          <p>Get in touch</p>
          <a mailto="hello@lukesecomb.digital">hello@lukesecomb.digital</a>
        </GetInTouchLeft>
        <IndexContainer>
            <section className="main_content">
              <div className="small_title">
                <p>Nice to meet you</p>
                <div></div>
              </div>
              <div className="content_box">
                <h1>Hey, I'm <span>Luke Secomb</span>, Web Developer, Photographer and Digital Designer.</h1>
                <p>I currently work at <span>Soda Strategic</span> as a <span>Web Developer</span>. I pride myself on delivering beautiful and user friendly experiences. I enjoy learning about new web technologies/frameworks and experimenting with various tools to make pixels look good.</p>
                <Button onClick={() => this.toggleView} buttonText="Get To Know Me"/>
              </div>
            </section>

            <Gallery/>

            <section className="main_content">
              <div className="small_title">
                <p>Keen for a chat?</p>
                <div></div>
              </div>
              <div className="content_box">
                <h1>Get in touch, or <span>stalk me</span>.</h1>
                <GetInTouch>
                  <ul>
                    <li>
                      <p>Email</p>
                      <a mailto="hello@lukesecomb.digital" target="_blank" rel="noopener noreferrer">hello@lukesecomb.digital</a>
                    </li>
                    <li>
                      <p>Github</p>
                      <a href="https://github.com/lukethacoder" target="_blank" rel="noopener noreferrer">@lukethacoder</a>
                    </li>
                    <li>
                      <p>LinkedIn</p>
                      <a href="https://linkedin.com/in/luke-secomb/" target="_blank" rel="noopener noreferrer">linkedin.com/in/luke-secomb</a>
                    </li>
                    <li>
                      <p>Instagram</p>
                      <a href="https://instagram.com/lukesecombdigital" target="_blank" rel="noopener noreferrer">@lukesecombdigital</a>
                    </li>
                  </ul>
                </GetInTouch>
                <Button onClick={() => this.toggleView} buttonText="Go Back Home" style={{marginTop: '64px'}}/>
              </div>
            </section>
        </IndexContainer>
      </Layout> 
    )
  }
}

export default IndexPage

const GetInTouchLeft = styled.div`
  /* width: 48px; */
  position: fixed;

  left: 48px;
  bottom: 48px;
  p {
    margin: 0;
    color: ${colors.white};
    font-size: .65rem;
    font-weight: ${weight.bold};
  }
  a {
    margin: 0;
    color: ${colors.grey};
    text-decoration: none;
    font-size: .65rem;
  }
`

const GoldBar = styled.div`
  width: 248px;
  min-height: 410vh;
  position: fixed;
  right: 59%;
  top: -268px;
  background-color: ${colors.gold};
  transform: rotate(23deg);
  z-index: 0;
  opacity: .65;
`

const IndexContainer = styled.div`
  .main_content {
    color: white;
    max-width: 820px;
    margin: 10vh 0 30vh;
    padding: 124px 0 0 10vw;
    position: relative;
    /* display: flex; */
    .small_title {
      color: ${colors.white};
      p {
        font-size: .75rem;
        font-weight: ${weight.bold};
      }
      > div {
        margin: 12px 0 0;
        height: 2px;
        width: 48px;
        background-color: ${colors.white};
      }
    }
    .content_box {
      padding: 48px 48px 0;
      h1 {
        font-size: 1.5rem;
        font-weight: ${weight.regular};
        color: ${colors.gold};
        margin-bottom: 48px;
        span {
          font-weight: ${weight.bold};
        }
      }
      p {
        span {
          font-weight: ${weight.bold};
        }
      }
    }
  }
`
const GetInTouch = styled.div`
  margin: 24px 0 48px ;
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 18px;
    list-style-type: none;
    margin: 0;
    padding: 0;
    p {
      color: ${colors.grey}
      font-size: .75rem;
      margin: 0;
    }
    a {
      margin: 0;
      text-decoration: none;
      color: ${colors.white};
      font-weight: ${weight.bold};
      font-size: .75rem;
    }
  }
`