import { MultistepProps } from "shared/ui/Multistep"

import { Language } from "shared/icons/Language"
import { Pets } from "shared/icons/Pets"
import { Science } from "shared/icons/Science"
import { Rocket } from "shared/icons/Rocket"
import { Organism } from "shared/icons/Organism"
import { Calculate } from "shared/icons/Calculate"
import { LightBulb } from "shared/icons/LightBulb"
import { Movie } from "shared/icons/Movie"
import { WorkCase } from "shared/icons/WorkCase"
import { Person } from "shared/icons/Person"
import { Devices } from "shared/icons/Devices"
import { Interests as InterestsIcon } from "shared/icons/Interests"

import { AuthCheckbox } from "../AuthCheckbox"
import { AuthForm } from "../AuthForm"
import { SignUpFormProps, signUpCard } from "../../lib"

export function Interests({
  setData,
  setPrevStep,
  setNextStep,
}: MultistepProps<SignUpFormProps>) {
  return (
    <AuthForm
      cardCaption={signUpCard.caption}
      cardTitle={signUpCard.title}
      setNextStep={setNextStep}
      setPrevStep={setPrevStep}
      title="Choose the topics you like"
      onSubmit={(data, next) => {
        setData((prevState) => ({ ...prevState, ...data }))
        next()
      }}>
      {({ register }) => (
        <div className="-m-2 grid max-h-56 grid-cols-2 gap-4 overflow-y-auto p-2">
          <AuthCheckbox
            Icon={Language}
            value="Geography"
            {...register("interests")}
          />
          <AuthCheckbox
            Icon={Pets}
            value="Animals"
            {...register("interests")}
          />
          <AuthCheckbox
            Icon={Science}
            value="Science"
            {...register("interests")}
          />
          <AuthCheckbox
            Icon={Rocket}
            value="Space"
            {...register("interests")}
          />
          <AuthCheckbox
            Icon={Organism}
            value="Biology"
            {...register("interests")}
          />
          <AuthCheckbox
            Icon={Calculate}
            value="Math"
            {...register("interests")}
          />
          <AuthCheckbox
            Icon={LightBulb}
            value="Physics"
            {...register("interests")}
          />
          <AuthCheckbox
            Icon={Movie}
            value="Movies"
            {...register("interests")}
          />
          <AuthCheckbox
            Icon={WorkCase}
            value="Jobs"
            {...register("interests")}
          />
          <AuthCheckbox
            Icon={Person}
            value="People"
            {...register("interests")}
          />
          <AuthCheckbox
            Icon={Language}
            value="Countries"
            {...register("interests")}
          />
          <AuthCheckbox
            Icon={Devices}
            value="Tech"
            {...register("interests")}
          />
          <AuthCheckbox
            Icon={InterestsIcon}
            value="Facts"
            {...register("interests")}
          />
        </div>
      )}
    </AuthForm>
  )
}
