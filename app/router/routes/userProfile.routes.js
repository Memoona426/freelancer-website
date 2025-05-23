const express = require("express");
const {
    createProfile,
    getProfile,
    updateProfile,
    deleteProfile,
} = require("../../controller/userProfile.controller");
const { authGuard } = require("../../middleware/authGuard");

const router = express.Router();

router.post("/createProfile", authGuard, createProfile);
router.get("/getProfile", authGuard, getProfile);
router.patch("/updateProfile", authGuard, updateProfile);
router.delete("/deleteProfile", authGuard, deleteProfile);

module.exports = router;