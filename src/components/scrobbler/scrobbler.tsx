import * as React from 'react'

export const Scrobbler = () => {
  return (
    <div>
      <div className='text-xs uppercase mb-1'>Currently Playing</div>
      <div className='flex items-end'>
        <img
          className='w-16'
          src='https://rapload.org/wp-content/uploads/2020/09/adbff56ba0aa54ab41.jpg'
        />
        <div className='ml-2'>
          <p className='text-2xs'>
            Spurs 3 (feat. Benny The Butcher & Westside Gunn)
          </p>
          <p className='text-2xs font-bold text-tertiary'>Conway the Machine</p>
        </div>
      </div>
    </div>
  )
}
