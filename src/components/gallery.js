import React, { Component } from 'react'
import styled from 'styled-components'
import GalleryItem from './gallery-item'
import { colors, weight } from '../_variables.js'

class Gallery extends Component {
  
  mapChildren() {
    
    return (
      <GalleryItem>
        <h1>Hola</h1>
      </GalleryItem>
    )
  }

  render() {
    return (
      <GalleryContainer>
        {this.mapChildren()}
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
  /* overflow: hidden; */
  position: relative;

  font-family: 'Raleway', sans-serif;

  /* background: rgba(20,20,20,1);
  background: -moz-linear-gradient(-45deg, rgba(20,20,20,1) 0%, rgba(44,44,44,1) 100%);
  background: -webkit-gradient(left top, right bottom, color-stop(0%, rgba(20,20,20,1)), color-stop(100%, rgba(44,44,44,1)));
  background: -webkit-linear-gradient(-45deg, rgba(20,20,20,1) 0%, rgba(44,44,44,1) 100%);
  background: -o-linear-gradient(-45deg, rgba(20,20,20,1) 0%, rgba(44,44,44,1) 100%);
  background: -ms-linear-gradient(-45deg, rgba(20,20,20,1) 0%, rgba(44,44,44,1) 100%);
  background: linear-gradient(135deg, rgba(20,20,20,1) 0%, rgba(44,44,44,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#141414', endColorstr='#2c2c2c', GradientType=1 ); */
`