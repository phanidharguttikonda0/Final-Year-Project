const mongoose = require("mongoose");

// Define the schema for chat history
const ChatSchema = new mongoose.Schema({
  srsText: { type: String, required: true },
  name: { type: String, required: true }, // name of the chat that an user can specify
  conversation: [
    {
      prompt: { type: String, required: true },
      modelUsed: { type: String, required: true },
      output: { type: String, required: true },
    },
  ],
});

// Define the schema for user
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  chatsHistory: [ChatSchema], // Array of chat history
});

// Create the model
const User = mongoose.model("User", UserSchema);

module.exports = { User, ChatSchema };
