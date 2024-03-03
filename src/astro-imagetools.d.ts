/**
 * Borrowed from:
 * https://github.com/RafidMuhymin/astro-imagetools/pull/171
 */
import {
  ImgConfigOptions,
  PictureConfigOptions,
  BackgroundImageConfigOptions,
  BackgroundPictureConfigOptions,
} from '../node_modules/astro-imagetools/config'

export const Img: (props: ImgConfigOptions) => string
export const Picture: (props: PictureConfigOptions) => string
export const BackgroundImage: (props: BackgroundImageConfigOptions) => string
export const BackgroundPicture: (
  props: BackgroundPictureConfigOptions
) => string
