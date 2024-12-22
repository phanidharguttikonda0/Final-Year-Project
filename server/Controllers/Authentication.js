const User = require("../Models/model");

async function registerUser(req, res) {
  try {
    const { email, mobile, password } = req.body;

    if (!email || !mobile || !password) {
      res.status(400).json({ message: "every thing is required" });
    }

    const existingUser1 = await User.findOne({ email });
    const existingUser2 = await User.findOne({ mobile });
    if (existingUser1) {
      return res.status(400).json({ message: "Email Id already exists" });
    }
    if (existingUser2) {
      return res.status(400).json({ message: "Mobile Number already exists" });
    }

    const newUser = new User({
      email,
      password,
      mobile,
      chatHistory: [],
    });

    await newUser.save();

    // Respond with success
    res.status(201).json({ message: "User registered successfully" });

    /*
    we use status 200 when request sucessfull when no resource is created
    where status 201 is used when request is sucessfull and resource is created
    */
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
}

async function checkUser(req, res) {
  try {
    const { email, password } = req.body;

    console.log(email, password);
    if (!email || !password) {
      return res.status(400).json({ message: "every feild is required" });
    }

    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Mail Id" });
    }
    if (existingUser.password === password) {
      return res.status(200).json({ message: "Login Check Successfull" });
    }

    return res.status(400).json({ message: "Password is Incorrect" });
  } catch (error) {
    console.log(`Error Occured during login attempt ${error}`);
    return res.status(500).json({ message: "Server Error during Login" });
  }
}

module.exports = { registerUser, checkUser };
