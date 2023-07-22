import * as React from 'react'

export const Banner = () => {
  return (
    <>
      <h3 className='uppercase text-xs mb-2'>Think differently</h3>
      <h1 className='font-bold text-3xl xxxl:text-4xl leading-tight'>
        Hi, I'm <span className='text-primary'>Luke</span> Web Developer and
        Photographic connoisseur. Specialist Lead at{' '}
        <a
          href='https://deloittedigital.com.au'
          target='_blank'
          rel='noopener'
          className='focus:underline hover:underline'
          style={{ color: '#777777' }}
        >
          Deloitte Digital
        </a>
        <span style={{ color: 'rgb(134, 188, 37)' }}>.</span>
      </h1>
    </>
  )
}
