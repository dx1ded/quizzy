import {
  PropsWithChildren,
  DetailedHTMLProps,
  LabelHTMLAttributes,
} from "react"
import { v4 as uuidv4 } from "uuid"
import { Tick } from "../../icons/Tick"

interface CheckboxProps
  extends DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  name: string
  checked?: boolean
}

export function Checkbox({
  children,
  name,
  checked = false,
  ...attrs
}: PropsWithChildren<CheckboxProps>) {
  const id = uuidv4()
  const className = `inline-flex items-center gap-1.5 ${attrs.className || ""}`

  return (
    <label {...attrs} className={className} htmlFor={id}>
      <input
        className="visually-hidden peer"
        defaultChecked={checked}
        id={id}
        name={name}
        type="checkbox"
      />
      <div className="h-4 w-4 cursor-pointer rounded border border-secondary bg-white text-white peer-checked:bg-secondary">
        <Tick className="text-current" />
      </div>
      {children}
    </label>
  )
}
