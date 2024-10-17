import User from "../models/userModel.js"
import bcrypt from 'bcrypt'

const register = async ({ username, email, password }) => {
    
  const existedUser = await User.findOne({email}) || await User.findOne({username})

  if(existedUser){
    return res.status(501).json({message: "User existed or you must fill all the fields"})
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