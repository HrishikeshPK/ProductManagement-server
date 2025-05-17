const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  console.log("Inside sign up api");
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "User already exists" }); // checking whether the user exists in the db

    const hashed = await bcrypt.hash(password, 10); // password hashing
    const user = new User({ name, email, password: hashed, });
    await user.save();

    res.status(201).json({ msg: "Signup success" });
  } catch (err) {
    res.status(500).json({ msg: "Signup error", error: err.message });
    console.log(err);
  }
};

exports.login = async (req, res) => {
  console.log("Inside login api");
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid email" }); //if user doesnt exist in the db

    const isMatch = await bcrypt.compare(password, user.password); // checking passowrd is correct for the respective user
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      // token generated which expires in 1 day
      expiresIn: "1d",
    });
    res.status(200).json({ currentUser: user, token });
  } catch (err) { 
    res.status(500).json({ msg: "Login error", error: err.message });
  }
};
