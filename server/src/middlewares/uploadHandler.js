import multer from 'multer'

const storageImages = multer.diskStorage({
  destination: "./assets/images",
})

const storageVideos = multer.diskStorage({
  destination: "./assets/videos",
})

const uploadImage = multer({ storage: storageImages })
const uploadVideo = multer({ storage: storageVideos })

export default {
  uploadImage,
  uploadVideo,
}
