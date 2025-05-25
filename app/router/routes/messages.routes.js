const express = require("express");
const { sendMessage, registerUser, markAsRead, getMessages } = require("../../controller/messages.controller");

const router = express.Router();

router.post("/registerUser", registerUser);
router.post("/sendMessage", sendMessage);
router.patch("/markAsRead", markAsRead);
router.get("/getMessages", getMessages);

module.exports = router;
