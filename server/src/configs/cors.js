const ALLOW_LIST = [
  'https://digital-academy-ten.vercel.app/',
  'https://digital-academy-ten.vercel.app',
  'http://localhost:5173/',
  'http://localhost:5173',
]

const corsConfig = {
  origin: function (origin, callback) {
    if (ALLOW_LIST.includes(origin) !== -1 || !origin) {
      callback(null, true)
    }else
    callback(new Error("Not allowed by CORS"))
  },
  optionsSuccessStatus: 204,
  credentials: true,
}

export default corsConfig
