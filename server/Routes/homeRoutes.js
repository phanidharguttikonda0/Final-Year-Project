const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const {
  getHistoryItems,
  getHistoryItem,
  postNewChat,
  postChat,
  getImage,
} = require("../Controllers/home");

router.post("/get-history-items", getHistoryItems);

router.post("/get-history-item", getHistoryItem);

router.post("/new-chat", upload.single("file"), postNewChat);

router.post("/post-chat", postChat);

router.post("/image", getImage);

module.exports = router;
