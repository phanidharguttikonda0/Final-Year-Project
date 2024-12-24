const { User, ChatSchema } = require("../Models/model");

const { getOutput, getSRSText, getSummary } = require("../Services/AIMModels");

const getChat = require("../Services/Chats");

async function getHistoryItems(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ message: `User doesn't exists with ${email}` });
    }

    return res.status(200).json({
      message: "Successfully got the chats history",
      value: user.chatsHistory,
    });
  } catch (error) {
    console.log(`Error was ${error}`);
    return res
      .status(500)
      .json({ message: "internal server error while getting the history" });
  }

  // return res.status(200).json({ message: "Sucessfull" });
}

async function getHistoryItem(req, res) {
  try {
    const { email, chatIndex } = req.body;
    const Chat = await getChat(email, chatIndex);
    if (Chat === null) {
      return res
        .status(404)
        .json({ message: "No chatIndex or email not found", value: {} });
    }
    return res.status(200).json({
      message: "",
      value: { chatName: Chat.name, conversations: Chat.conversation },
    });
  } catch (error) {
    console.log(`The Error was ${error}`);
    return res.status(500).json({
      message: "Internal Servor Error while getting a history item",
      value: false,
    });
  }
}

async function postNewChat(req, res) {
  try {
    const { email, prompt, model, name } = req.body;
    // const file = req.body.file;

    // here we will call for a AI model for getting the SRS_TEXT from the file we get
    const SRS_TEXT = "A movie application like netflix";
    // const SRS_TEXT = await getSRSText(file) ;

    // here we will call the Actual AI by passing the prompt along with the SRS_TEXT
    // const outPut = await getOutput(prompt, SRS_TEXT, undefined);

    const chatData = {
      srsText: SRS_TEXT,
      name: name,
      conversation: [
        {
          prompt: prompt,
          modelUsed: model,
          output: "This is an Example", // Example output (update as needed)
          // output: outPut
        },
      ],
    };

    const result = await User.updateOne(
      { email }, // Find user by email
      {
        $push: {
          chatsHistory: chatData, // Push the new chat object into the chatsHistory array
        },
      },
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        message: "user not found and changes doesn't made",
        value: false,
      });
    }

    return res
      .status(201)
      .json({ message: "new Chat added Sucessfuly", value: true });
  } catch (error) {
    console.log(`Errror was ${error}`);
    return res
      .status(500)
      .json({ message: "server error while posting a new chat", value: false });
  }
}

async function postChat(req, res) {
  try {
    const { email, chatIndex, prompt, model } = req.body;

    // firstly we need to get the previous chats
    const Chat = await getChat(email, chatIndex); // returns that particular chat
    const SRS_TEXT = Chat.srsText;
    // getting summary know
    // const Summary = await getSummary(Chat);
    const Summary = "focus on the Current prompt as of know";

    // know calling the model for getting the output
    // const output = await getOutput(prompt, SRS_TEXT, Summary);
    const output = "some code over here";

    const newConversation = {
      prompt: prompt,
      modelUsed: model,
      output: output,
    };

    const result = await User.updateOne(
      { email }, // Find the user by email
      {
        $push: {
          [`chatsHistory.${chatIndex}.conversation`]: newConversation, // Using the index to target the conversation array
        },
      },
    );

    // pushed the new prompt and out-put in to the conversation of a specific entry

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        message: "May be User not found or changes doesn't made",
        value: false,
      });
    }

    return res
      .status(201)
      .json({ message: "Succefully added the new conversation", value: true });
  } catch (error) {
    console.log(`Error was ${error}`);
    return res
      .status(500)
      .json({ message: "Error Occurred due to posting a chat", value: false });
  }
}

module.exports = { getHistoryItems, getHistoryItem, postNewChat, postChat };
