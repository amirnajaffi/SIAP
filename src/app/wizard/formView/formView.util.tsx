import dayjs from "dayjs"

export function convertDatesToDayjs(obj) {
  const newObj = {}

  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]

      if (
        typeof value === 'string' &&
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)
      ) {
        newObj[key] = dayjs(value)
      } else {
        newObj[key] = value
      }
    }
  }

  return newObj
}
