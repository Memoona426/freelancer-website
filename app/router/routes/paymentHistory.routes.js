const express = require("express");
const { authGuard } = require("../../middleware/authGuard");
const { createPaymentHistory, getAllPaymentHistory } = require("../../controller/paymentHistory.controller");

const router = express.Router();

router.post("/createPaymentHistory", authGuard, createPaymentHistory);
router.get("/getAllPaymentHistory", authGuard, getAllPaymentHistory);

module.exports = router;
