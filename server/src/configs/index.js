import 'dotenv/config'

const ENV = {
  'MONGO_URI': process.env.MONGO_URI,
  'PORT': process.env.PORT,
  'DATABASE_NAME': process.env.DATABASE_NAME,
}

export default ENV