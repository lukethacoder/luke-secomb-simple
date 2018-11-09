import React, { Component } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { colors, weight } from '../_variables.js'

const galleryItems = [
  {
    "title": "any.ideas",
    "link": "any-ideas",
    "color": "#626262",
  },
  {
    "title": "WP Webhook Netlify Deploy",
    "link": "wp-webhook-netlify-deploy",
    "color": "#01BDAE",
  },
]

class Gallery extends Component {
  render() {
    console.log('galleryItems => ', galleryItems)
    let keys = Object.keys(galleryItems);
    console.log('keys => ', keys)

    let returnMe = keys.map(key => {
      return (
        <div key={key}>
          <Link to={galleryItems[key].link}>
            <h2>{galleryItems[key].title}
              <span className="underline" style={{backgroundColor: galleryItems[key].color}}/>
            </h2>
          </Link>
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
  padding: 64px 148px;
  /* overflow: hidden; */
  position: relative;

  font-family: 'Raleway', sans-serif;
  display: grid;
  grid-gap: 12px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  > div {
    border: 2px solid ${colors.gold};
    transition: .5s;
    
    background-color: ${colors.black_one};
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
            transition: .5s;
          }
        }
      }
    }
    a {
      width: 100%;
      height: 100%;
      display: grid;
      text-align: center;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: .5s;
      h2 {
        position: relative;
        margin: 0;
        transition: .5s;
        color: ${colors.gold};
        .underline {
          opacity: 0;
          position: absolute;
          bottom: -24px;
          left: 0;
          right: 0;
          height: 5px;
          width: 48px;
          margin: 0 auto;
          transition: .5s;
        }
      }
    }
  }
`