import * as React from 'react'

export const WorkTypeToggle = () => {
  const [contentType, setContentType] = React.useState('client')

  const setClientWork = () => {
    console.log('setClientWork')
    setContentType('client')
  }
  const setProjectWork = () => {
    console.log('setProjectWork')
    setContentType('project')
  }
  const toggleContentType = () => {
    console.log('toggleContentType')
    setContentType(contentType === 'client' ? 'project' : 'client')
  }

  return (
    <div className='flex items-center'>
      <span
        onClick={setClientWork}
        className={`underline uppercase select-none text-xs cursor-pointer ${
          contentType === 'client' ? 'font-bold' : ''
        }`}
      >
        client work
      </span>
      <svg
        version='1.1'
        id='Layer_1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        x='0px'
        y='0px'
        viewBox='0 0 42.1 15.8'
        xmlSpace='preserve'
        className={`fill-current h-4 ml-4 mr-3 transform-gpu duration-200 ${
          contentType === 'client' ? '-scale-x-100' : 'scale-x-100'
        }`}
        onClick={toggleContentType}
      >
        <path
          id='arrow'
          d='M42.1,7.9L34,0l-2.7,2.6L34.8,6H0v3.7h34.8l-3.5,3.4l2.7,2.6L42.1,7.9z'
        />
      </svg>
      <span
        onClick={setProjectWork}
        className={`underline uppercase select-none text-xs cursor-pointer ${
          contentType === 'project' ? 'font-bold' : ''
        }`}
      >
        side projects
      </span>
    </div>
  )
}
