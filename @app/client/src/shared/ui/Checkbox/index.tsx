import { PropsWithChildren, forwardRef, ComponentPropsWithoutRef } from "react"
import { v4 as uuidv4 } from "uuid"
import { Tick } from "../../icons/Tick"

interface CheckboxProps extends ComponentPropsWithoutRef<"input"> {
  /**
   * Checkbox name which is used for connection with other checkboxes in HTML
   */
  name: string
  /**
   * Checked state which determines if a checkbox is selected
   */
  checked?: boolean
  /**
   * Span classname
   */
  checkboxClassName?: string
}

export const Checkbox = forwardRef<
  HTMLInputElement,
  PropsWithChildren<CheckboxProps>
>(function Checkbox({ children, className, checkboxClassName, ...attrs }, ref) {
  const id = uuidv4()
  const labelClassName = `inline-flex items-center gap-1.5 ${className || ""}`

  return (
    <label className={labelClassName} htmlFor={id}>
      <input
        ref={ref}
        className="visually-hidden peer"
        id={id}
        type="checkbox"
        {...attrs}
      />
      <span
        className={`h-4 w-4 cursor-pointer rounded border border-secondary bg-white text-white peer-checked:border-secondary peer-checked:bg-secondary ${
          checkboxClassName || ""
        }`}>
        <Tick />
      </span>
      {children}
    </label>
  )
})
