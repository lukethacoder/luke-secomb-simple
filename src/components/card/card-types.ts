import { IGatsbyImageData } from 'gatsby-plugin-image'

export interface ICard {
  title: string
  description: string
  devDescription: string
  url: string
  imageMain: IGatsbyImageData
  imageLogo: IGatsbyImageData
}
