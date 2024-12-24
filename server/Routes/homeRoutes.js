const express = require("express");
const router = express.Router();
const {
  getHistoryItems,
  getHistoryItem,
  postNewChat,
  postChat,
} = require("../Controllers/home");

router.post("/get-history-items", getHistoryItems);

router.post("/get-history-item", getHistoryItem);

router.post("/new-chat", postNewChat);

router.post("/post-chat", postChat);

module.exports = router;
