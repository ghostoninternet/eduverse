import 'dotenv/config'

const ENV = {
  'MONGO_URI': process.env.MONGO_URI,
  'PORT': process.env.PORT,
  'DATABASE_NAME': process.env.DATABASE_NAME,
  'AT_SECRET_KEY': process.env.AT_SECRET_KEY,
  'RT_SECRET_KEY': process.env.RT_SECRET_KEY,
}

export default ENV