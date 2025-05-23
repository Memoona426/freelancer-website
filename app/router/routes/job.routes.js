const express = require("express");
const { authGuard } = require("../../middleware/authGuard");
const { postJobsByEmployer } = require("../../controller/jobs.controller");

const router = express.Router();

router.post("/postJobsByEmployer", authGuard, postJobsByEmployer);

module.exports = router;
