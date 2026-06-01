import React from 'react'

function Button(
    {children,
      type='button',
      bgColor='bg-black',
      textColor='text-white',
      className='',
      ...props
    }) {
  return (
    <button className={`px-5 py-2.5 rounded-lg font-medium transition-colors hover:bg-blue-500 ${bgColor} ${textColor} ${className}`}{...props}>
        {children}
    </button>
  )
}

export default Button