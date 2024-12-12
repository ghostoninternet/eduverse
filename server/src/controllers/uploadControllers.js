import uploadServices from "../services/uploadServices.js"

const uploadImage = async (req, res, next) => {
  const result = await uploadServices.uploadImage(req.file)
  res.status(200).json({
    data: result,
  })
}

export default {
  uploadImage,
}