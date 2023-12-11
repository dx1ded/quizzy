import {
  PropsWithChildren,
  DetailedHTMLProps,
  LabelHTMLAttributes,
} from "react"
import { v4 as uuidv4 } from "uuid"
import { Tick } from "../../icons/Tick"

interface RadioProps
  extends DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  /**
   * Radio name which is used for connection with other radios in HTML
   */
  name: string
  /**
   * Checked state which determines if a radio is selected
   */
  checked?: boolean
}

export function Radio({
  children,
  name,
  checked = false,
  ...attrs
}: PropsWithChildren<RadioProps>) {
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
      <div className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border border-gray text-white peer-checked:border-secondary peer-checked:text-secondary">
        <Tick className="text-current" height={0.75} width={0.75} />
      </div>
      {children}
    </label>
  )
}
