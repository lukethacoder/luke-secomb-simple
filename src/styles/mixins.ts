import { dimensions } from './variables'

export const getEmSize = (size: number) => size / dimensions.fontSize.regular
export const trans = () => `all 0.3s ease`
export const no_select = () => `
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`
