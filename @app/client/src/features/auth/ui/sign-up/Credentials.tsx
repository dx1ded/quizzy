import { useForm, SubmitHandler } from "react-hook-form"
import { Caption, Subheading } from "shared/ui/Typography"
import { Input } from "shared/ui/Input"
import { Button } from "shared/ui/Button"
import { ArrowBack } from "shared/icons/ArrowBack"

interface Inputs {
  email: string
  password: string
  confirmPassword: string
}

export function Credentials() {
  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <div className="flex min-h-screen items-center bg-primary">
      <div className="mx-auto flex min-h-[26rem] max-w-4xl flex-1 gap-2 rounded-lg bg-white">
        <div className="flex max-w-[24rem] flex-col justify-center rounded-l-lg bg-gradient-to-br from-accent via-white via-70% to-accent p-10">
          <Subheading className="mb-4">Sign up</Subheading>
          <Caption>
            Create your account in a few steps, and you will get an access to
            the platform and personal cabinet
          </Caption>
        </div>
        <div className="flex flex-1 flex-col justify-between p-5">
          <Subheading />
          <form>
            <Caption className="mb-2 inline-block font-semibold">
              E-mail
            </Caption>
            <Input
              className="w-full text-sm [&:not(:last-child)]:mb-5"
              placeholder="E-mail"
              {...register("email")}
            />
            <Caption className="mb-2 inline-block font-semibold">
              Password
            </Caption>
            <Input
              className="w-full text-sm [&:not(:last-child)]:mb-5"
              placeholder="Password"
              type="password"
              {...register("password")}
            />
            <Caption className="mb-2 inline-block font-semibold">
              Confirm password
            </Caption>
            <Input
              className="w-full text-sm [&:not(:last-child)]:mb-5"
              placeholder="Confirm password"
              type="password"
              {...register("confirmPassword")}
            />
          </form>
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
        </div>
      </div>
    </div>
  )
}
