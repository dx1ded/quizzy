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
import { MultistepProps } from "shared/ui/Multistep"
import { Calendar } from "shared/icons/Calendar"
import { AuthForm } from "../AuthForm"
import { AuthLabel } from "../AuthLabel"
import { AuthInput } from "../AuthInput"
import { SignUpFormProps, signUpCard } from "../../lib"

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
    <div ref={ref}>
      <AuthLabel htmlFor={id}>Date of birth</AuthLabel>
      <div className="relative">
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
    </div>
  )
}

export function DateOfBirth({
  setPrevStep,
  setNextStep,
  setData,
}: MultistepProps<SignUpFormProps>) {
  const [open, setOpen] = useState(false)

  return (
    <AuthForm
      cardCaption={signUpCard.caption}
      cardTitle={signUpCard.title}
      setNextStep={setNextStep}
      setPrevStep={setPrevStep}
      onSubmit={(data, next) => {
        setData((prevState) => ({ ...prevState, ...data }))
        next()
      }}>
      {({ control }) => (
        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={dayjs(field.value).format("MM/DD/YYYY")}
                open={open}
                slotProps={{ field: { setOpen } as never }}
                slots={{ field: DatePickerField }}
                onChange={(date) => field.onChange(date)}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
              />
            </LocalizationProvider>
          )}
        />
      )}
    </AuthForm>
  )
}
