import React from 'react'
import { useId } from 'react'

function Select(
    {
    options,
    label,
    className,
    ...props
    },ref
) {

    const id=useId()
  return (
    <div className='w-full'>
        
         {label && <label htmlFor={id} className='inline-block mb-2 text-sm font-medium text-theme-text'>{label}</label>}
         <select
         {...props}
         id={id}
         ref={ref}
          className={`px-4 py-2.5 rounded-lg bg-theme-bg text-theme-text outline-none focus:ring-1 focus:ring-theme-text border border-theme-border w-full transition-colors ${className}`}
         >
            {options?.map((option)=>(
                <option key={option} value={option} className="bg-white text-theme-text">
                    {option}
                </option>
            ))}

         </select>
    
    </div>
  )
}

export default React.forwardRef(Select)