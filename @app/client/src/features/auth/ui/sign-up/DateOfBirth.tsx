import { Dispatch, SetStateAction, useState } from "react"
import { Controller } from "react-hook-form"
import {
  DatePicker,
  LocalizationProvider,
  UseDateFieldProps,
  BaseSingleInputFieldProps,
  FieldSection,
  DateValidationError,
} from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs"
import { DateOfBirthSchema } from "@quizzy/common"
import { SignUpFormProps } from "shared/lib"
import { MultistepProps } from "shared/ui/Multistep"
import { Calendar } from "shared/icons/Calendar"
import { AuthForm } from "../AuthForm"
import { AuthLabel } from "../AuthLabel"
import { AuthInput } from "../AuthInput"
import { AuthValidation } from "../AuthValidation"
import { signUpCard } from "../../lib"

interface ButtonFieldProps
  extends UseDateFieldProps<Dayjs>,
    BaseSingleInputFieldProps<
      Dayjs | null,
      Dayjs,
      FieldSection,
      DateValidationError
    > {
  setOpen?: Dispatch<SetStateAction<boolean>>
}

function DatePickerField(props: ButtonFieldProps) {
  const {
    setOpen,
    label,
    id,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props

  return (
    <div ref={ref} className="relative">
      <AuthInput
        aria-label={ariaLabel}
        id={id}
        value={String(label)}
        readOnly
        onClick={() => setOpen?.((prev) => !prev)}
      />
      <Calendar
        className="pointer-events-none absolute right-3 top-1/2 inline-block -translate-y-1/2"
        width={0.85}
      />
    </div>
  )
}

export function DateOfBirth({
  data: { dateOfBirth },
  setData,
  setPrevStep,
  setNextStep,
}: MultistepProps<SignUpFormProps>) {
  const [open, setOpen] = useState(false)

  return (
    <AuthForm
      cardCaption={signUpCard.caption}
      cardTitle={signUpCard.title}
      defaultValues={{ dateOfBirth }}
      setNextStep={setNextStep}
      setPrevStep={setPrevStep}
      validationSchema={DateOfBirthSchema}
      onSubmit={(data, next) => {
        setData((prevState) => ({ ...prevState, ...data }))
        next()
      }}>
      {({ control, initialErrors }) => (
        <>
          <AuthLabel htmlFor="dateOfBirth">Date of birth</AuthLabel>
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field, formState }) => (
              <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={dayjs(field.value).format("MM/DD/YYYY")}
                    open={open}
                    slotProps={{
                      field: {
                        setOpen,
                        id: "dateOfBirth",
                      } as never,
                    }}
                    slots={{ field: DatePickerField }}
                    onChange={(date) => field.onChange(date?.toDate())}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                  />
                </LocalizationProvider>
                <AuthValidation
                  error={formState.errors.dateOfBirth}
                  initialErrors={initialErrors.dateOfBirth}
                />
              </>
            )}
          />
        </>
      )}
    </AuthForm>
  )
}
