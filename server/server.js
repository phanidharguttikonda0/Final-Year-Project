const express = require("express");
const authentication = require("./Routes/authenticationRoutes.js");
const home = require("./Routes/homeRoutes.js");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config(); // it configs the dotenv file at the current directory
connectDB();
// now this creates a connection throught out the server until the server stops

// Middleware
app.use(express.json()); // Parses JSON request bodies

app.use("/", authentication); // all parent routes will go in to authentication

app.use("/home", home);

// let's learn about the back-end project structure of the node js
// and also learn how to store files in the mongo db

// today we are going to work on these two things

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
