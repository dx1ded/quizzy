import { ComponentPropsWithoutRef, forwardRef, ComponentType } from "react"
import { v4 as uuidv4 } from "uuid"
import { IconProps } from "shared/lib"
import { Tick } from "shared/icons/Tick"

interface AuthCheckboxProps extends ComponentPropsWithoutRef<"input"> {
  value: string
  Icon: ComponentType<IconProps>
}

export const AuthCheckbox = forwardRef<HTMLInputElement, AuthCheckboxProps>(
  function AuthCheckbox({ Icon, value, ...props }: AuthCheckboxProps, ref) {
    const id = uuidv4()

    return (
      <div className="relative">
        <input
          ref={ref}
          {...props}
          className="visually-hidden peer"
          id={id}
          type="checkbox"
          value={value}
        />
        <label
          className="flex cursor-pointer items-center gap-4 rounded border border-white bg-white p-4 drop-shadow transition peer-checked:border-black peer-checked:bg-accent peer-checked:[&>div]:visible peer-checked:[&>div]:flex peer-checked:[&>div]:opacity-100"
          htmlFor={id}>
          <div className="invisible absolute -right-1.5 -top-1.5 hidden h-5 w-5 items-center justify-center rounded-full bg-black opacity-0">
            <Tick color="#fff" width={1} />
          </div>
          <Icon width={1.2} />
          <p>{value}</p>
        </label>
      </div>
    )
  }
)
