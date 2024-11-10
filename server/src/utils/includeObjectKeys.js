const includeObjectKeys = (obj, includeKeys) => {
  if (typeof obj !== 'object') {
    return null
  }

  let newObject = {}
  Object.keys(obj).forEach(key => {
    if (includeKeys.includes(key)) {
      newObject[key] = obj[key]
    }
  })

  return newObject
}

export default includeObjectKeys