import React, { Component } from 'react'
// import { Link } from 'gatsby'
import styled from 'styled-components'
import { colors } from '../_variables.js'

const galleryItems = [
  {
    "title": "Australian Roundhouses",
    "link": "work/australian-roundhouses",
    "github": "https://github.com/lukethacoder/ar_gatsbyjs_v2",
    "color": "#0064B3",
  },
  {
    "title": "any.ideas",
    "link": "work/any-ideas",
    "github": "https://github.com/lukethacoder/anyideas",
    "color": "#626262",
  },
  {
    "title": "pide",
    "link": "work/pide",
    "github": "https://github.com/HurricaneInteractive/pide",
    "color": "#1ed760",
  },
  {
    "title": "WP Webhook Netlify Deploy",
    "link": "work/wp-webhook-netlify-deploy",
    "github": "https://github.com/lukethacoder/wp-webhook-deploy-netlify",
    "color": "#01BDAE",
  },
  {
    "title": "Posh Weather",
    "link": "work/posh-weather",
    "github": "https://github.com/lukethacoder/posh-weather",
    "color": "#ddb462",
  },
  {
    "title": "wordpress-headless-starter",
    "link": "work/ignite-driving",
    "github": "https://github.com/lukethacoder/wordpress-headless-starter",
    "color": "#00A0D2",
  },
  {
    "title": "Ignite Driving",
    "link": "work/ignite-driving",
    "github": "https://ignitedriving.com.au/",
    "color": "#553b8c",
  },
  {
    "title": "Personal Brand",
    "link": "work/ignite-driving",
    "github": "https://github.com/lukethacoder/luke-secomb-simple",
    "color": "#FFC87F",
  },
  {
    "title": "sassiness",
    "link": "work/ignite-driving",
    "github": "https://github.com/lukethacoder/sassiness",
    "color": "#c6538c",
  }
]

class Gallery extends Component {
  render() {
    console.log('galleryItems => ', galleryItems)
    let keys = Object.keys(galleryItems);
    console.log('keys => ', keys)

    let returnMe = keys.map(key => {
      return (
        <div key={key}>
          <a href={galleryItems[key].github} target="_blank" rel="noopener noreferrer" aria-label={'link to project ' + galleryItems[key].title}>
            <h2>{galleryItems[key].title}
              <span className="underline" style={{backgroundColor: galleryItems[key].color}}/>
            </h2>
          </a>
        </div>
      )
    })

    return (
      <GalleryContainer>
        {returnMe}
      </GalleryContainer>
    )
  }
}

export default Gallery


const GalleryContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  padding: 24px 64px;
  /* overflow: hidden; */
  position: relative;

  font-family: 'Raleway', sans-serif;
  display: grid;
  grid-gap: 12px;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    padding: 64px 86px;
  }
  @media (min-width: 1079px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    padding: 64px 148px;
  }
  > div {
    border: 2px solid ${colors.gold};
    transition: .5s;
    
    background-color: ${colors.black_one};
    min-height: 148px;
    display: grid;
    align-content: stretch;
    justify-content: stretch;
    @media (min-width: 1079px) {
      min-height: 224px;
    }
    &:hover {
      border: 2px solid initial;
      transition: .5s;
      a {
        border-width: 2px;
        transition: .5s;
        h2 {
          color: ${colors.gold};
          transition: .5s;
          .underline {
            opacity: 1;
            width: 48px;
            transition: .5s;
          }
        }
      }
    }
    a {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      display: grid;
      text-align: center;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: .5s;
      h2 {
        font-size: 1rem;
        position: relative;
        margin: 12px;
        transition: .5s;
        color: ${colors.gold};
        @media (min-width: 1079px) {
          font-size: 1.5rem;
        }
        .underline {
          position: absolute;
          bottom: -24px;
          left: 0;
          right: 0;
          height: 5px;
          width: 0px;
          margin: 0 auto;
          transition: .5s;
        }
      }
    }
  }
`