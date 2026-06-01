import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-2 text-sm font-medium text-theme-text' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-4 py-2.5 rounded-lg bg-theme-bg text-theme-text outline-none focus:ring-1 focus:ring-theme-text border border-theme-border w-full transition-colors ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input