import { MenuItem, Select } from "@mui/material"
import { Button } from "shared/ui/Button"

export function Settings() {
  return (
    <aside className="flex basis-48 flex-col px-3 pb-1 pt-4">
      <div className="mb-5">
        <p className="mb-1.5 font-bold">Time limit</p>
        <Select
          sx={{
            "& .MuiSelect-select": {
              padding: "0.5rem 1rem",
            },
          }}
          value={20}
          fullWidth>
          <MenuItem value={10}>10 sec</MenuItem>
          <MenuItem value={20}>20 sec</MenuItem>
          <MenuItem value={30}>30 sec</MenuItem>
        </Select>
      </div>
      <div className="mb-5">
        <p className="mb-1.5 font-bold">Points</p>
        <Select
          sx={{
            "& .MuiSelect-select": {
              padding: "0.5rem 1rem",
            },
          }}
          value={1}
          fullWidth>
          <MenuItem value={1}>Standard</MenuItem>
          <MenuItem value={2}>More (+1)</MenuItem>
          <MenuItem value={3}>More (+2)</MenuItem>
        </Select>
      </div>
      <div className="mt-auto flex flex-col gap-2.5 border-t border-gray pt-3">
        <Button size="md" variant="white">
          Delete
        </Button>
        <Button size="md" variant="secondary">
          Duplicate
        </Button>
      </div>
    </aside>
  )
}
