import mongoose from 'mongoose'
import ENV from './index.js'
import generateSampleData from './generateSampleData.js'; 

async function DatabaseInit(Application) {
  mongoose.connection.on('connected', () => {
    console.log("Connected to Database!")
  })
 

  mongoose.connection.on('disconnected', () => {
    console.log("Disconnected to Database!")
  })
  
  await mongoose.connect(ENV.MONGO_URI, {
    dbName: ENV.DATABASE_NAME
  })
  .then(() => {
    // generateSampleData(); 
    Application()
    
  })
  .catch((err) => {
    console.log("Error connecting to Database!")
    console.log(err)
  })
}

export default DatabaseInit