const express = require("express");
const { authGuard } = require("../../middleware/authGuard");
const { getAllContracs, createContract, updateContarct } = require("../../controller/contract.controller");

const router = express.Router();

router.post("/createContract", authGuard, createContract);
router.get("/getAllContracs", authGuard, getAllContracs);
router.patch("/updateContarct", authGuard, updateContarct);

module.exports = router;
