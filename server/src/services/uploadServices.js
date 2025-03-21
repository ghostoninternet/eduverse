import { v2 as cloudinary } from 'cloudinary';
import ENV from '../configs/index.js'
import CustomError from '../errors/customError.js'
import videoDurationHandler from '../utils/videoDurationHandler.js';

cloudinary.config({
  cloud_name: ENV.CLOUD_NAME,
  api_key: ENV.API_KEY,
  api_secret: ENV.API_SECRET,
})

const uploadImage = async (file) => {
  const multerPath = file.path
  const transformedPath = multerPath.replaceAll("\\", "/")

  try {
    const result = await cloudinary.uploader.upload(transformedPath)

    return result.url

  } catch (error) {
    throw new CustomError.InternalServerError("Something went wrong when uploading file")
  }
}

const uploadVideo = async (file) => {
  const multerPath = file.path
  const transformedPath = multerPath.replaceAll("\\", "/")

  try {
    const result = await cloudinary.uploader.upload(transformedPath, {
      resource_type: 'video',
      folder: 'videos'
    })

    return {
      duration: videoDurationHandler(result.duration),
      url: result.url
    }

  } catch (error) {
    console.log(error)
    throw new CustomError.InternalServerError("Something went wrong when uploading file")
  }
}

export default {
  uploadImage,
  uploadVideo,
}