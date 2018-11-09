import React from 'react'
import styled from 'styled-components'
import { colors } from '../_variables.js'

const Button = ({ buttonText }) => (
  <ButtonContainer>
    <p>{buttonText}</p>
    <svg xmlns="http://www.w3.org/2000/svg" width="68.84" height="7.57" viewBox="0 0 68.84 7.57"><title>Group 13</title><rect className="one" y="2.78" width="61.28" height="2"/><path className="two" d="M61.28,0l7.56,3.78L61.28,7.57Z"/></svg>
  </ButtonContainer>
)

export default Button


const ButtonContainer = styled.button`
  border: 2px solid ${colors.grey};
  background-color: transparent;
  padding: 24px 36px;
  display: flex;
  align-items: center;
  transition: .5s;
  cursor: pointer;
  &:hover {
    border: 2px solid ${colors.white};
    transition: .5s;
    svg {
      .one {
        x: 25;
        transition: .5s;
      }
    }
  }
  p {
    color: ${colors.white};
    margin: 0 16px 0 0;
    font-size: .75rem;
  }
  svg {
    fill: ${colors.gold};
    margin: 12px;
    .one {
      x: 0;
      transition: .5s;
    }
  }
`