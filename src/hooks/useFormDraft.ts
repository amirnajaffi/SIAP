import {useLocalStorage} from 'usehooks-ts'

const useFormDraft = (formKey: string) => {
  const [draft, setDraft, removeDraft] = useLocalStorage(formKey, {})

  return {draft, setDraft, removeDraft}
}

export default useFormDraft
