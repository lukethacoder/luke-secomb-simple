import * as React from 'react'

export const Banner = () => {
  return (
    <>
      <h3 className='uppercase text-xs mb-2'>Think differently</h3>
      <h1 className='font-bold text-3xl xxxl:text-4xl leading-tight'>
        Hi, I'm <span className='text-primary'>Luke</span> Web Developer and
        Photographic connoisseur. Senior Developer at{' '}
        <a
          href='https://sodastrategic.com.au'
          target='_blank'
          style={{ color: '#6B2EFF' }}
        >
          Soda Strategic
        </a>
        .
      </h1>
    </>
  )
}
