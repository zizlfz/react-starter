import { Input as AriaInput, InputProps as AriaInputProps } from 'react-aria-components'
import { Ref, forwardRef } from 'react'
import './Input.css'

export interface InputProps extends AriaInputProps {
  variant?: 'default'
  className?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { variant = 'default', className = '', ...props }: InputProps,
  ref: Ref<HTMLInputElement>
) {
  return (
    <AriaInput
      ref={ref}
      className={`
          react-aria-Input
          variant-${variant}
          ${className}
        `}
      {...props}
    />
  )
})
