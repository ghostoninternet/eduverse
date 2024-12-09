import 'dotenv/config'

const ENV = {
  'MONGO_URI': process.env.MONGO_URI,
  'PORT': process.env.PORT,
  'DATABASE_NAME': process.env.DATABASE_NAME,
  'AT_SECRET_KEY': process.env.AT_SECRET_KEY,
  'RT_SECRET_KEY': process.env.RT_SECRET_KEY,
  'CLOUD_NAME': process.env.CLOUD_NAME,
  'API_KEY': process.env.API_KEY,
  'API_SECRET': process.env.API_SECRET,
  'CLOUDINARY_URL': process.env.CLOUDINARY_URL,
}

export default ENV