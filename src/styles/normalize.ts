import { dimensions, fonts, colors, breakpoints } from './variables'
import { rem } from './mixins'

export default `
  @import url('https://fonts.googleapis.com/css?family=Muli|Raleway:400,700')
  @import url(https://cdn.jsdelivr.net/gh/tonsky/FiraCode@1.206/distr/fira_code.css);
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
    color: ${colors.grey.base};
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
    border-left: .25rem solid ${colors.brand};
    background-color: rgba(255,255,255,0.05);
    color: ${colors.brand};
    p {
      &:last-child {
        margin-bottom: 0;
      }
    }

    @media (min-width: ${rem(breakpoints.md)}em) {
      padding-right: 5rem;
      padding-left: 1.25rem;
    }
  }

  .gatsby-highlight {
    background-color: ${colors.gradientStart};
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${colors.brand};
    overflow: visible;
    padding: 0;
    margin: 0 0 16px;
    @media screen and (min-width: 767px) {
      border-bottom-color: ${colors.brand} !important;
    }
    > pre {
      margin: 0;
      padding: 16px 24px;
      border: none;
      background-color: transparent;
      width: 100%;
      height: 100%;
      font-size: ${rem(14)}rem;
      > code {
        color: $content-color;
        font-family: 'Fira Code', monospace;
      }
    }
    &[data-language] {
      position: relative;
      &:after {
        content: '';
        display: block;
        color: ${colors.grey.dark};
        background: ${colors.brand};
        text-transform: uppercase;
        position: absolute;
        top: 0;
        right: 0;
        padding: 4px 12px;
        font-size: 0.875rem;
        font-weight: 700;
        border-bottom-left-radius: 3px;
        @media screen and (max-width: 767px) {
          content: '' !important;
          top: auto;
          bottom: 0;
          right: 0;
          padding: 0;
          width: 100%;
          height: 3px;
        }
      }
    }
    &[data-language="javascript"] {

    border-bottom-color: ${colors.syntax.javascript};
      &:after {
        content: 'JS';
        background-color: ${colors.syntax.javascript};
      }
    }
    &[data-language="json"] {
      border-bottom-color: ${colors.syntax.json};
      &:after {
        content: 'JSON';
        background-color: ${colors.syntax.json};
      }
    }
    &[data-language="html"] {
      border-bottom-color: ${colors.syntax.html};
      &:after {
        content: 'HTML';
        background-color: ${colors.syntax.html};
      }
    }
  }

  .gatsby-code-button-container {
    background-color: peru;
    height: 40px;
    width: 100px;
  }
  .gatsby-code-button {}
  .gatsby-code-button-icon {}
  .gatsby-code-button-toaster {}
  .gatsby-code-button-toaster-text {}
`
