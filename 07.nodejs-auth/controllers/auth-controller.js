const User = require("../models/User");
const bcrypt = require('bcrypt');

// register controller
const registerUser = async (req, res) => {
  try {
    // extract data from request body
    const { username, email, password, role } = req.body;

    // validate data
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    //check if user already exists in our database
    const checkExistingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (checkExistingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user and save to database
    const newUsername = new User({ username, email, password: hashedPassword, role: role || "user" });

    await newUsername.save();
    if (newUsername) {
      return res.status(201).json({ success: true, message: "User created successfully", user: newUsername });
    } else {
      return res.status(400).json({ success: false, message: "Failed to create user please try again" });
    }

  }
  catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// login controller
const loginUser = async (req, res) => {

  try { }
  catch (error) { }
}


module.exports = { registerUser, loginUser };