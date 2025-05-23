const express = require("express");
const { authGuard } = require("../../middleware/authGuard");
const { updateMileStone, getAllMileStone, createMileStone } = require("../../controller/milestone.controller");

const router = express.Router();

router.post("/createMileStone", authGuard, createMileStone);
router.get("/getAllMileStone", authGuard, getAllMileStone);
router.patch("/updateMileStone", authGuard, updateMileStone);

module.exports = router;
