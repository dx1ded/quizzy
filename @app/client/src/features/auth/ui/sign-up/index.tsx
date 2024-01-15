import { signUpFormState } from "shared/lib"
import { Multistep } from "shared/ui/Multistep"
import { Credentials } from "./Credentials"
import { FullName } from "./FullName"
import { Username } from "./Username"
import { DateOfBirth } from "./DateOfBirth"
import { Interests } from "./Interests"
import { ParentMultistepControls } from "../../lib"

export function SignUp({ parentSetPrev }: ParentMultistepControls) {
  return (
    <Multistep defaultState={signUpFormState}>
      {(props) => (
        <>
          <Credentials {...props} parentSetPrev={parentSetPrev} />
          <FullName {...props} />
          <Username {...props} />
          <DateOfBirth {...props} />
          <Interests {...props} />
        </>
      )}
    </Multistep>
  )
}
