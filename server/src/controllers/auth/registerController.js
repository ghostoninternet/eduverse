import User from "../../models/userModel.js";

export const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({
      username: username,
      email: email,
      password: password,
    });
    const existedUser =
      (await User.findOne({ email: email })) ||
      (await User.findOne({ username: username }));

    if (existedUser) {
      //neu da ton tai nguoi dung hoac chua nhap du thong tin
      return res.status(501).json({ success: false, error: "Check input again!" });
    }

    await newUser.save();

    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(500).json({ error:"error"});
  }
};
