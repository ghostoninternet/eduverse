import User from "../models/userModel.js"
import bcrypt from 'bcrypt'
import CustomError from '../errors/customError.js'

const register = async ({ username, email, password }) => {
    
  const existedUser = await User.findOne({email}) || await User.findOne({username})

  if(existedUser){
    throw new CustomError.UserAlreadyExistError()
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword
  })
  
  await newUser.save();
}

export default {
  register
}