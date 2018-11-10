import React, { Component } from 'react'
import styled from 'styled-components'
// import { colors, weight } from '../../_variables.js'

const category_colors = {
  "vue": "#4fc08d",
  "react": "#61dafb",
  "php": "#8892BF",
  "laravel": "#f4645f",
  "javascript": "#F0DB4F",
  "soundcloud": "#f50",
  "wordpress": "#00A0D2",
  "spotify": "#1ed760",
}

class Categories extends Component {
  mapCategories(data) {
    return (
      <ul>
        {data.map(function(data, key){
          return <li key={key} style={{color: category_colors[data.toLowerCase()], border: '1px solid ' + category_colors[data.toLowerCase()] + ''}}>{data}</li>;
        })}
      </ul>
    )
  }

  render() {
    return (
      <CategoriesContainer>
        {this.mapCategories(this.props.categories)}
      </CategoriesContainer>
    )
  }
}

export default Categories

const CategoriesContainer = styled.div`
  /* height: 10vh; */
  width: 100%;
  ul {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
    li {
      color: white;
      border: 1px solid white;
      margin-right: 12px;
      padding: 2px 10px;
      font-size: .65rem;
      border-radius: 4px;
      cursor: default;
    }
  }
`