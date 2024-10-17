import express from "express"
import ENV from "./src/configs/index.js"
import DatabaseInit from "./src/configs/database.js"
import router from "./src/routes/index.js"

function Application() {
  const app = express()
  const PORT = ENV.PORT
  
  app.use('/api', router)

  app.listen(PORT, () => {
    console.log(`Server start on http://localhost:${PORT}`)
  });
}

DatabaseInit(Application)