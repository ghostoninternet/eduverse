import express from "express";
import mongoose from "mongoose";
import User from "./src/models/userModel.js"; //use for testing connection
import "dotenv/config";
import registerRoute from './src/routes/Register/registerRoute.js'
import loginRoute from './src/routes/Login/loginRoute.js'
const app = express();

//connect db
try {
  await mongoose.connect(process.env.URI);
  console.log("MongoDB connected");
} catch (error) {
  res.send(error);
}

//test the connection
// const result = await User.find({});
// console.log(result);

app.get("/", (req, res, next) => {
  res.status(200).send("Hello World!");
});

app.use('/', registerRoute);
app.use('/', loginRoute);

app.listen(8000, () => {
  console.log("Server start on http://localhost:8000");
});
