const express = require("express");

const {
  signIn,
  signUp,
  resetPassword,
  forgotPassword,
  varifyAccount,
  logOutUser,
} = require("../../controller/auth.controller");
const { authGuard } = require("../../middleware/authGuard");

const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
router.post('/varifyAccount', varifyAccount);
router.post('/logout', authGuard, logOutUser);


module.exports = router;