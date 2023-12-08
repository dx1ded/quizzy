import "./styles/index.css"
import { Button } from "shared/ui/Button"
import { Checkbox } from "shared/ui/Checkbox"
import { Radio } from "shared/ui/Radio"

export function App() {
  return (
    <div>
      <Button className="m-2">Hello World!</Button>
      <Checkbox className="m-2">
        <p>123</p>
      </Checkbox>
      <Radio>
        <p>Hey!</p>
      </Radio>
    </div>
  )
}
