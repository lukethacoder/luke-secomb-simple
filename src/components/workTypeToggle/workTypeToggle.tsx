import * as React from 'react'

export const WorkTypeToggle = ({ handleToggleContentType }) => {
  const [contentType, setContentType] = React.useState('client')

  React.useEffect(() => {
    // send event back to parent
    handleToggleContentType(contentType)
  }, [contentType])

  const setClientWork = () => {
    setContentType('client')
  }
  const setProjectWork = () => {
    setContentType('project')
  }
  const toggleContentType = () => {
    setContentType(contentType === 'client' ? 'project' : 'client')
  }

  return (
    <div className='flex items-center'>
      <button
        onClick={setClientWork}
        className={`underline uppercase select-none text-xs cursor-pointer border-0 ${
          contentType === 'client' ? 'font-bold' : ''
        }`}
      >
        client work
      </button>
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
      <button
        onClick={setProjectWork}
        className={`underline uppercase select-none text-xs cursor-pointer border-0 ${
          contentType === 'project' ? 'font-bold' : ''
        }`}
      >
        side projects
      </button>
    </div>
  )
}
