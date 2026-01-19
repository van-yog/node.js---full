const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
  console.log(req.body);
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // check if user exists in our database
    console.log("Trying to find user");
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    console.log("User found", user);
    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }
    console.log("Password is correct", isPasswordCorrect);

    // Check if JWT_SECRET_KEY is set
    if (!process.env.JWT_SECRET_KEY) {
      return res.status(500).json({ success: false, message: "JWT_SECRET_KEY is not configured" });
    }

    // Generate access token
    const accessToken = jwt.sign(
      {
        userId: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15m" }
    );

    console.log("Access token generated", accessToken);
    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  }
  catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

const changePassword = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // check if user exists in our database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // check if old password is correct
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ success: false, message: "Invalid old password" });
    }

    // hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // update password in database
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ success: true, message: "Password changed successfully" });
  }
  catch (error) {
    console.log("Error in change password controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { registerUser, loginUser, changePassword };