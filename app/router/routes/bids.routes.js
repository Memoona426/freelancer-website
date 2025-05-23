const express = require("express");
const { authGuard } = require("../../middleware/authGuard");
const { reviewBidByExployeer, createBidByFreelancer } = require("../../controller/bid.controller");


const router = express.Router();

router.post("/createBidByFreelancer", authGuard, createBidByFreelancer);
router.get("/reviewBidByExployeer", authGuard, reviewBidByExployeer);

module.exports = router;