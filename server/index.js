import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import User from "./src/models/userModel.js"; //use for testing connection
import "dotenv/config";
import registerRoute from "./src/routes/auth/registerRoute.js";
import loginRoute from "./src/routes/auth/loginRoute.js";
import secretRoute from "./src/routes/secretRoute.js";
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", registerRoute);
app.use("/", loginRoute);
app.use("/", secretRoute);
app.listen(8000, () => {
  console.log("Server start on http://localhost:8000");
});
