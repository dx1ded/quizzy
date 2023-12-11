import "./styles/index.css"
import { Button } from "shared/ui/Button"
import { Checkbox } from "shared/ui/Checkbox"
import { Radio } from "shared/ui/Radio"
import { Person } from "shared/icons/Person"
import { Logo } from "shared/ui/Logo"

export function App() {
  return (
    <div>
      <Button className="m-2">Hello World!</Button>
      <Checkbox className="m-2" name="checkboxes">
        <p>123</p>
      </Checkbox>
      <Radio className="m-2" name="radios">
        <p>Hey!</p>
      </Radio>
      <Person width={1} />
      <Logo />
    </div>
  )
}
