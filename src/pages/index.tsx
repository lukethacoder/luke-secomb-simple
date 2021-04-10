import * as React from 'react'
import { LayoutPrimary } from 'layouts'
import { Banner, WorkTypeToggle } from 'components'

const IndexPage = () => {
  // TODO: handle toggle between client work/side projects

  return (
    <LayoutPrimary>
      <div className='grid grid-cols-12'>
        <div className='md:mt-40 col-span-5 pr-8'>
          <Banner />
          <div className='mt-12'>
            <WorkTypeToggle />
          </div>
        </div>
        <div className='col-span-7'>
          <ul>
            <li>test</li>
            <li>tes</li>
            <li>te</li>
            <li>t</li>
          </ul>
        </div>
      </div>
    </LayoutPrimary>
  )
}

export default IndexPage
