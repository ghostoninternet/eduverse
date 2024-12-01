const excludeObjectKeys = (obj, excludeKeys) => {
  if (typeof obj !== 'object') {
    return null
  }

  let newObject = {}
  Object.keys(obj).forEach(key => {
    if (!excludeKeys.includes(key)) {
      newObject[key] = obj[key]
    }
  })

  return newObject
}

export default excludeObjectKeys