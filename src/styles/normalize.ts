import { dimensions, fonts, colors, breakpoints } from './variables'
import { getEmSize } from './mixins'

export default `
  @import url('https://fonts.googleapis.com/css?family=Muli|Raleway:400,700')
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    font-size: ${dimensions.fontSize.regular}px !important;
    line-height: ${dimensions.lineHeight.regular} !important;
  }

  body {
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    font-family: ${fonts.sansSerif};
    color: ${colors.black};
    background-color: ${colors.white};
    background: ${colors.gradientStart}; /* Old browsers */
    background: -moz-linear-gradient(-45deg, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(-45deg, ${colors.gradientStart} 0%,${colors.gradientEnd} 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(135deg, ${colors.gradientStart} 0%,${
  colors.gradientEnd
} 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${colors.gradientStart}', endColorstr='${
  colors.gradientEnd
}',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  a {
    color: ${colors.brand};
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  img {
    max-width: 100%;
    object-fit: contain;
    position: relative;
  }

  figure {
    margin: 2rem 0;
  }

  figcaption {
    font-size: 80%;
  }

  table {
    width: 100%;
    margin-bottom: 1rem;
    border: 1px solid ${colors.ui.light};
    font-size: 85%;
    border-collapse: collapse;
  }

  td,
  th {
    padding: .25rem .5rem;
    border: 1px solid ${colors.ui.light};
  }

  th {
    text-align: left;
  }

  tbody {
    tr {
      &:nth-of-type(odd) {
        td {
          background-color: ${colors.ui.whisper};
        }
        tr {
          background-color: ${colors.ui.whisper};
        }
      }
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 1.414rem;
    margin-bottom: .5rem;
    color: ${colors.black};
    font-weight: 600;
    line-height: ${dimensions.lineHeight.heading};
    text-rendering: optimizeLegibility;
  }

  h1 {
    margin-top: 0;
    font-size: ${dimensions.headingSizes.h1}rem;
    color: ${colors.brand};
  }

  h2 {
    font-size: ${dimensions.headingSizes.h2}rem;
    color: ${colors.brand};
  }

  h3 {
    font-size: ${dimensions.headingSizes.h3}rem;
    color: ${colors.brand};
  }

  h4, h5, h6 {
    font-size: ${dimensions.headingSizes.h4}rem;
    color: ${colors.gray.base};
  }

  h6 {
    color: ${colors.white}
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  strong {
    color: ${colors.black};
  }

  ul,
  ol,
  dl {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  dt {
    font-weight: bold;
  }

  dd {
    margin-bottom: .5rem;
  }

  hr {
    position: relative;
    margin: 1.5rem 0;
    border: 0;
    border-top: 1px solid ${colors.ui.light};
  }

  blockquote {
    margin: .8rem 0;
    padding: .5rem 1rem;
    border-left: .25rem solid ${colors.ui.light};
    color: ${colors.gray.calm};

    p {
      &:last-child {
        margin-bottom: 0;
      }
    }

    @media (min-width: ${getEmSize(breakpoints.md)}em) {
      padding-right: 5rem;
      padding-left: 1.25rem;
    }
  }
`
