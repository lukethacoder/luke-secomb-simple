import React from 'react'
import styled from 'styled-components'
import Categories from './categories'

import { colors } from '../../_variables.js'

const WorkHeader = (data) => (
  <WorkHeaderContainer style={{background: 'url(' + data.data.image + ')'}}>
    <div className="overlay">
      <h1>{data.data.title}</h1>
      <p>{data.data.intro}</p>
      <Categories categories={data.data.categories}/>
      <ExternalLinks>
        {data.data.github ? <a href={data.data.github} target="_blank" rel="noopener noreferrer">Github</a> : null}
        {data.data.website ? <a href={data.data.website} target="_blank" rel="noopener noreferrer">Website</a> : null}
      </ExternalLinks>
    </div>
  </WorkHeaderContainer>
)

export default WorkHeader

const ExternalLinks = styled.div`
  margin-top: 24px;
  a {
    color: ${colors.gold};
    margin-right: 24px;
  }
`

const WorkHeaderContainer = styled.div`
  min-height: 50vh;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 10;
  .overlay {
    min-height: 50vh;
    width: 100%;
    padding: 148px 48px 64px 148px;
    color: ${colors.white};

    background: rgba(20,20,20,.75);
    background: -moz-linear-gradient(-45deg, rgba(20,20,20,.75) 0%, rgba(44,44,44,1) 100%);
    background: -webkit-gradient(left top, right bottom, color-stop(0%, rgba(20,20,20,.75)), color-stop(100%, rgba(44,44,44,1)));
    background: -webkit-linear-gradient(-45deg, rgba(20,20,20,.75) 0%, rgba(44,44,44,1) 100%);
    background: -o-linear-gradient(-45deg, rgba(20,20,20,.75) 0%, rgba(44,44,44,1) 100%);
    background: -ms-linear-gradient(-45deg, rgba(20,20,20,.75) 0%, rgba(44,44,44,1) 100%);
    background: linear-gradient(135deg, rgba(20,20,20,.75) 0%, rgba(44,44,44,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#141414', endColorstr='#2c2c2c', GradientType=1 );
    > h1 {

    }
    > p {
      opacity: .75;
    }
  }

`