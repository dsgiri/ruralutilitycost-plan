import * as React from "react"
import { cn } from "../../lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex w-full text-sm border border-[#D1D5D2] rounded px-3 py-2 bg-white text-[#1A1C1A] outline-none focus:border-[#2D5A27] focus-visible:outline-none focus:ring-1 focus:ring-[#2D5A27] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
