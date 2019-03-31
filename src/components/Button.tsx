import * as React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

import Arrow from '../assets/arrow.svg'

import { widths, colors } from '../styles/variables'
import { getEmSize, trans } from '../styles/mixins'

interface ButtonProps {
  link: string
  text: string
  className?: string
  isInternal?: boolean
}

const Button: React.SFC<ButtonProps> = ({ link, text, className, isInternal }) => {
  return (
    <StyledButton className={className}>
      {isInternal ? (
        <Link to={link}>
          <p>{text}</p>
          <Arrow />
        </Link>
      ) : (
        <a href={link}>
          <p>{text}</p>
          <Arrow />
        </a>
      )}
    </StyledButton>
  )
}

export default Button

const StyledButton = styled.button`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: auto;
  max-width: ${getEmSize(widths.lg)}em;
  background-color: transparent;
  border: 1px solid ${colors.white};
  transition: ${trans};
  &:hover {
    border: 1px solid ${colors.brand};
    transition: ${trans};

    a {
      padding: 24px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      text-decoration: none;
      p {
        margin: 0 24px 0 0;
        color: ${colors.brand};
        transition: ${trans};
      }
      svg {
        width: 108px;
        transition: ${trans};
      }
    }
  }
  a {
    padding: 24px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-decoration: none;
    p {
      margin: 0 24px 0 0;
      color: ${colors.white};
      font-weight: 700;
      transition: ${trans};
    }
    svg {
      width: 96px;

      transition: ${trans};
    }
  }
`
