import { Children, useMemo } from "react"
import { useForm, UseFormRegister, FieldValues } from "react-hook-form"
import { Caption, Subheading } from "shared/ui/Typography"
import { ArrowBack } from "shared/icons/ArrowBack"
import { Button } from "shared/ui/Button"
import { MultistepProps } from "shared/ui/Multistep"
import { ChildrenAsFunction } from "shared/lib"

interface AuthFormProps<T> extends MultistepProps<T> {
  /**
   * the title is used for the left side (card)
   */
  cardTitle: string
  /**
   * the caption is used for the left side (card)
   */
  cardCaption: string
  /**
   * the title is used for the top right side
   */
  title?: string
  /**
   * Used to add / remove the navigation on the bottom
   */
  withNavigation?: boolean
}

interface AuthFormChildrenProps {
  register: UseFormRegister<FieldValues>
}

export function AuthForm<T>({
  children,
  cardTitle,
  cardCaption,
  title = "",
  withNavigation = true,
}: AuthFormProps<T> & ChildrenAsFunction<AuthFormChildrenProps>) {
  const { register, handleSubmit } = useForm()

  const onSubmit = () => {
    console.log(1)
  }

  const invokedChildren = useMemo(
    () =>
      Children.toArray(
        children({
          register,
        })
      ),
    [children, register]
  )

  return (
    <div className="mx-auto flex min-h-[26rem] max-w-4xl flex-1 gap-2 rounded-lg bg-white">
      <div className="flex max-w-[24rem] flex-col justify-center rounded-l-lg bg-gradient-to-br from-accent via-white via-70% to-accent p-10">
        <Subheading className="mb-4">{cardTitle}</Subheading>
        <Caption>{cardCaption}</Caption>
      </div>
      <div className="flex flex-1 flex-col justify-between p-5">
        <Subheading>{title}</Subheading>
        <form>{invokedChildren}</form>
        {withNavigation && (
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2.5 text-sm" type="button">
              <ArrowBack width={0.75} />
              Previous step
            </button>
            <Button
              className="px-4 py-1.5"
              size="md"
              variant="secondary"
              onClick={handleSubmit(onSubmit)}>
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
