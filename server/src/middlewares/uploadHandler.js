import multer from 'multer'

const storageImages = multer.diskStorage({
  destination: "./assets/images",
})

const uploadImage = multer({ storage: storageImages })

export default {
  uploadImage,
}
