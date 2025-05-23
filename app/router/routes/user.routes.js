const express = require("express");
const { authGuard } = require("../../middleware/authGuard");
const {
  toggleUserByAdmin,
  getAllFreelancersByAdmin,
  getAllEmployeeByAdmin,
} = require("../../controller/user.controller");

const router = express.Router();

router.post("/toggleUserByAdmin", authGuard, toggleUserByAdmin);
router.get("/getAllFreelancersByAdmin", authGuard, getAllFreelancersByAdmin);
router.get("/getAllEmployeeByAdmin", authGuard, getAllEmployeeByAdmin);

module.exports = router;
