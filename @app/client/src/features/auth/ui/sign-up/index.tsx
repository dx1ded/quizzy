import { Multistep } from "shared/ui/Multistep"
import { Credentials } from "./Credentials"
import { FullName } from "./FullName"
import { Username } from "./Username"
import { DateOfBirth } from "./DateOfBirth"
import { Interests } from "./Interests"
import { signUpFormState } from "../../lib"

export function SignUp() {
  return (
    <Multistep defaultState={signUpFormState}>
      {(props) => (
        <>
          <Credentials {...props} />
          <FullName {...props} />
          <Username {...props} />
          <DateOfBirth {...props} />
          <Interests {...props} />
        </>
      )}
    </Multistep>
  )
}
