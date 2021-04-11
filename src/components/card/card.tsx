import * as React from 'react'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { ICard } from './card-types'

import './style.css'

export const Card: React.FC<ICard> = (data) => {
  const imageMain: IGatsbyImageData = getImage(data.imageMain)
  const imageLogo: IGatsbyImageData = getImage(data.imageLogo)

  return (
    <article className='card flex flex-col'>
      <div className='card-image-container flex relative w-full'>
        <GatsbyImage image={imageMain} alt={data.title} />
        <div className='card-image-logo w-13 h-13 p-2 z-10'>
          <GatsbyImage image={imageLogo} alt={data.title} />
        </div>
      </div>
      <div className='card-content relative z-10 flex flex-col'>
        <h2 className='font-bold text-2xl xxxl:text-4xl uppercase mb-0 leading-4 mt-2'>
          {data.title}
        </h2>
        <p className='uppercase text-xs mb-2 mt-2'>{data.description}</p>
        <a
          className='font-bold text-xs ml-auto mb-2 uppercase underline flex items-center'
          href={data.url}
          target='_blank'
        >
          View project
          <svg
            version='1.1'
            id='Layer_1'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            x='0px'
            y='0px'
            viewBox='0 0 42.1 15.8'
            xmlSpace='preserve'
            className='fill-current h-4 ml-4'
          >
            <path
              id='arrow'
              d='M42.1,7.9L34,0l-2.7,2.6L34.8,6H0v3.7h34.8l-3.5,3.4l2.7,2.6L42.1,7.9z'
            />
          </svg>
        </a>
      </div>
    </article>
  )
}
