import {
  Dispatch,
  SetStateAction,
  Children,
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  useForm,
  SubmitHandler,
  FieldValues,
  Control,
  DefaultValues,
  UseFormRegister,
  UseFormSetError,
} from "react-hook-form"
import { z, ZodType } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import AwesomeDebouncePromise from "awesome-debounce-promise"
import { FieldAvailability } from "@quizzy/common"
import { Caption, Subheading } from "shared/ui/Typography"
import { ArrowBack } from "shared/icons/ArrowBack"
import { Button } from "shared/ui/Button"
import { MultistepProps } from "shared/ui/Multistep"
import { capitalize, ChildrenAsFunction } from "shared/lib"

interface AuthFormProps<T extends FieldValues>
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
  onSubmit?(data: T, next: () => void, setError: UseFormSetError<T>): void
}

interface AuthFormChildrenProps<T extends FieldValues> {
  register: UseFormRegister<T>
  control: Control<T>
  initialErrors: Record<keyof T, string[]>
  loadingField: keyof T | null
  setFocusedField: Dispatch<SetStateAction<string | null>>
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
  /* This state is used for inputs that are supposed to be checked by its
   availability */
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [initialErrors, setInitialErrors] = useState<Record<keyof T, string[]>>(
    {} as T
  )
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
  } = useForm<T>({
    defaultValues,
    resolver: zodResolver(
      validationSchema?.superRefine(
        AwesomeDebouncePromise(async (data, context) => {
          const { isSubmitting } = control._formState
          const field = data.email ? "email" : data.username ? "username" : ""

          if (
            !field ||
            (!focusedField && !isSubmitting) ||
            (errors[field] &&
              (errors[field]?.type !== "custom" || !isSubmitting))
          ) {
            return
          }

          setLoadingField(focusedField)

          const request = await fetch(`/api/auth/check-${field}`, {
            method: "POST",
            body: JSON.stringify({ [field]: data[field] }),
            headers: {
              "Content-Type": "application/json",
            },
          })

          if (!request.ok) {
            setLoadingField(null)
            return
          }

          const { isAvailable } = (await request.json()) as Awaited<
            Promise<FieldAvailability>
          >

          if (!isAvailable) {
            context.addIssue({
              message: `${capitalize(field)} is already used!`,
              path: [field],
              code: z.ZodIssueCode.custom,
            })
          }

          setLoadingField(null)
        }, 80)
      ) || z.object({})
    ),
    mode: "onChange",
    criteriaMode: "all",
  })

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

  const submitHandler: SubmitHandler<T> = () => {
    onSubmit(getValues(), setNextStep, setError)
  }

  const invokedChildren = useMemo(
    () =>
      Children.toArray(
        children({
          register,
          control,
          initialErrors,
          loadingField,
          setFocusedField,
        })
      ),
    [register, children, control, initialErrors, loadingField]
  )

  return (
    <div className="mx-auto flex min-h-[26rem] max-w-4xl flex-1 animate-fadeIn gap-x-2 rounded-lg bg-white md:min-h-full md:flex-col">
      <div className="flex max-w-[24rem] flex-col justify-center rounded-l-lg bg-gradient-to-br from-accent via-white via-70% to-accent p-10 md:max-w-full sm:px-4 sm:py-6">
        <Subheading className="mb-4 sm:mb-2.5">{cardTitle}</Subheading>
        <Caption>{cardCaption}</Caption>
      </div>
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-3.5">
        <Subheading
          className="md:!mt-0"
          style={{ marginTop: title ? "1rem" : "0" }}>
          {title}
        </Subheading>
        <form>{invokedChildren}</form>
        {withNavigation && (
          <div className="flex items-center justify-between md:mt-6">
            <button
              className="flex items-center gap-2.5 text-sm sm:gap-2 sm:text-xs"
              type="button"
              onClick={setPrevStep}>
              <ArrowBack className="sm:w-2.5" width={0.75} />
              Previous step
            </button>
            <Button
              className="px-4 py-1.5"
              disabled={Boolean(loadingField)}
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
