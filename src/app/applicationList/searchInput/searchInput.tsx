import {Input} from 'antd'
import type {DebouncedState} from 'usehooks-ts'

interface SearchInput {
  setSearchText: DebouncedState<(value: string) => void>
}

const SearchInput = ({setSearchText}: SearchInput) => {
  return (
    <Input
      placeholder="Search applications"
      onChange={(e) => {
        setSearchText(e.target.value)
      }}
      style={{width: 300}}
    />
  )
}

export default SearchInput
