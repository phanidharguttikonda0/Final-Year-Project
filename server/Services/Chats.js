const { User, ChatSchema } = require("../Models/model");

async function getChat(email, index) {
  if (email === undefined || index === undefined) {
    return null;
  }

  // Using the  aggregate function to get the specific chat by using the index value of that chat
  const result = await User.aggregate([
    { $match: { email } },
    {
      $project: {
        chat: { $arrayElemAt: ["$chatsHistory", index] }, // Extracting the chat at the specified index
      },
    },
  ]);

  if (!result || result.length === 0 || !result[0].chat) {
    return null;
  }

  return result[0].chat;
}

module.exports = getChat;
