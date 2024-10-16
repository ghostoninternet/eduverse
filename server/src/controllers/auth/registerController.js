import User from "../../models/userModel.js";
import bcrypt from 'bcrypt'
export const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
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

    res.status(201).json({
      success: true,
      data:{
        userId: newUser._id,
        email: newUser.email,
        password: hashedPassword
      }
    })
    
  } catch (error) {
    res.status(500).json({ error:"error"});
  }
};
