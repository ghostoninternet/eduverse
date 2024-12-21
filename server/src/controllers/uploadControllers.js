import uploadServices from "../services/uploadServices.js"

const uploadImage = async (req, res, next) => {
  const result = await uploadServices.uploadImage(req.file)
  res.status(200).json({
    message: "Successfully uploaded an image",
    data: result,
  })
}

const uploadVideo = async (req, res, next) => {
  const result = await uploadServices.uploadVideo(req.file)
  res.status(200).json({
    message: "Successfully uploaded a video",
    data: result
  })
}

export default {
  uploadImage,
  uploadVideo,
}