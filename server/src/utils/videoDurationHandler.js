const videoDurationHandler = (duration) => {
  const seconds = Math.ceil(duration)
  return Math.ceil(seconds / 60)
}

export default videoDurationHandler
