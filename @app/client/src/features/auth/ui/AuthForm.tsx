import { Children, FormEvent, useEffect, useMemo, useState } from "react"
import {
  useForm,
  SubmitHandler,
  FieldValues,
  Control,
  DefaultValues,
  Path,
  UseFormRegister,
} from "react-hook-form"
import { z, ZodType } from "zod"
import { useDebouncedCallback } from "use-debounce"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldAvailability } from "@quizzy/common"
import { Caption, Subheading } from "shared/ui/Typography"
import { ArrowBack } from "shared/icons/ArrowBack"
import { Button } from "shared/ui/Button"
import { MultistepProps } from "shared/ui/Multistep"
import { capitalize, ChildrenAsFunction } from "shared/lib"

interface AuthFormProps<T>
  extends Partial<Pick<MultistepProps<T>, "setPrevStep" | "setNextStep">> {
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
  /**
   * Form default values
   */
  defaultValues: DefaultValues<T>
  /**
   * Zod validation schema
   */
  validationSchema?: ZodType<T>
  /**
   * Function to be invoked when one of the nav buttons is clicked
   * Has a middleware function next() which should be called to get into the
   * next stage
   */
  onSubmit?(data: T, next: () => void): void
}

interface AuthFormChildrenProps<T extends FieldValues> {
  register: UseFormRegister<T>
  control: Control<T>
  initialErrors: Record<keyof T, string[]>
  loadingField: keyof T | null
}

export function AuthForm<T extends FieldValues>({
  children,
  cardTitle,
  cardCaption,
  title = "",
  withNavigation = true,
  validationSchema,
  defaultValues,
  setPrevStep = () => {},
  setNextStep = () => {},
  onSubmit = () => {},
}: AuthFormProps<T> & ChildrenAsFunction<AuthFormChildrenProps<T>>) {
  const [loadingField, setLoadingField] = useState<keyof T | null>(null)
  const [initialErrors, setInitialErrors] = useState<Record<keyof T, string[]>>(
    {} as T
  )
  const { register, control, handleSubmit, getValues, setError } = useForm<T>({
    defaultValues,
    resolver: zodResolver(validationSchema || z.object({})),
    criteriaMode: "all",
    mode: "onChange",
  })

  const checkAvailability = async (data: string, field: string) => {
    console.log(data, field)
    const request = await fetch(`/api/auth/check-${field}`, {
      method: "POST",
      body: JSON.stringify({ [field]: data }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const { isAvailable } = (await request.json()) as Awaited<
      Promise<FieldAvailability>
    >

    setLoadingField(null)
    if (!isAvailable) {
      setError(field as Path<T>, {
        message: `${capitalize(field)} is already taken`,
        type: "too_big",
      })
    }

    return isAvailable
  }

  const debouncedCheck = useDebouncedCallback(checkAvailability, 1000)

  // Get initial set of errors, so we can display them all
  useEffect(() => {
    if (Object.keys(initialErrors).length) return

    const emptyFields = getValues() as { [key: string]: string }

    // Fields are undefined by default, but we need an empty string
    Object.keys(emptyFields).forEach((key) => {
      emptyFields[key] = ""
    })

    const validation = validationSchema?.safeParse(emptyFields)

    if (!validation || validation.success) return

    const basicErrors = validation.error.formErrors
      .fieldErrors as typeof initialErrors

    setInitialErrors(basicErrors)
  }, [initialErrors, getValues, validationSchema])

  const submitHandler: SubmitHandler<T> = async (data) => {
    const isAvailable = await checkAvailability(data.email, "email")
    if (isAvailable) onSubmit(data, setNextStep)
  }

  /* Only to set loading for fields that need to be checked if the value is
   already used */
  const changeHandler = (e: FormEvent<HTMLFormElement>) => {
    setTimeout(() => {
      const target = e.target as HTMLInputElement
      const field = target.id

      if (control._formState.errors[field] || !target.dataset.check) return

      setLoadingField(field as keyof T)
      debouncedCheck(target.value, field)
    }, 0)
  }

  const invokedChildren = useMemo(
    () =>
      Children.toArray(
        children({
          register,
          control,
          initialErrors,
          loadingField,
        })
      ),
    [register, children, control, initialErrors, loadingField]
  )

  return (
    <div className="mx-auto flex min-h-[26rem] max-w-4xl flex-1 animate-fadeIn gap-2 rounded-lg bg-white">
      <div className="flex max-w-[24rem] flex-col justify-center rounded-l-lg bg-gradient-to-br from-accent via-white via-70% to-accent p-10">
        <Subheading className="mb-4">{cardTitle}</Subheading>
        <Caption>{cardCaption}</Caption>
      </div>
      <div className="flex flex-1 flex-col justify-between p-5">
        <Subheading style={{ marginTop: title ? "1rem" : "0" }}>
          {title}
        </Subheading>
        <form onChange={changeHandler}>{invokedChildren}</form>
        {withNavigation && (
          <div className="flex items-center justify-between">
            <button
              className="flex items-center gap-2.5 text-sm"
              type="button"
              onClick={setPrevStep}>
              <ArrowBack width={0.75} />
              Previous step
            </button>
            <Button
              className="px-4 py-1.5"
              size="md"
              variant="secondary"
              onClick={handleSubmit(submitHandler)}>
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
