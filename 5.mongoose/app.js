const mongoose = require("mongoose");

const URL = "mongodb+srv://ikharchenko2008_db_user:lcAlOb89DQwLAdMc@cluster0.5xpzwbv.mongodb.net/";

mongoose.connect(URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
})

// create user model
const User = new mongoose.model("User", userSchema);


async function runQueryExample() {
  try {

    // const newUser = await User.create({
    //   name: "John Doe 1",
    //   email: "john.doe@example.com",
    //   age: 25,
    //   isActive: false,
    //   tags: ["developer", "programmer"],
    // });

    // // console.log("New user created:", newUser);
    // await newUser.save();
    const users = await User.find().select("name email -_id");
    console.log("Users:", users);

    const users2 = await User.find().select("name email -_id").sort({ age: 1 });
    console.log("Users2:", users2);
  } catch (error) {
    console.log("Error:", error);
  }
}

runQueryExample();