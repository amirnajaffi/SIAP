import { useEffect } from 'react'
import {useLocalStorage} from 'usehooks-ts'

const usePreferredColorScheme = () => {
  const [preferredColor, setPreferredColor] = useLocalStorage(
    'prefcolor',
    'light',
  )

  useEffect(() => {
    const body = document.body
    body.classList.remove('light', 'dark')
    body.classList.add(preferredColor)
  }, [preferredColor])

  return {preferredColor, setPreferredColor}
}

export default usePreferredColorScheme
