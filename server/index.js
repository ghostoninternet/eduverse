import express from "express"
import ENV from "./src/configs/index.js"
import DatabaseInit from "./src/configs/database.js"
import router from "./src/routes/index.js"
import errorHandler from "./src/middlewares/errorHandler.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
function Application() {
  const app = express()
  const PORT = ENV.PORT
  app.use(express.urlencoded({extended: true}))
  app.use('/api/payment/webhook', express.raw({ type: "*/*" }))
  app.use(express.json())
  app.use(cookieParser())
  app.use(cors({
    origin: 'http://localhost:5173', // Your client URL
    credentials: true, // Allow credentials to be sent
  }));
  app.use('/api', router)
  
  app.use(errorHandler)

  app.listen(PORT, () => {
    console.log(`Server start on http://localhost:${PORT}`)
  });
}

DatabaseInit(Application)