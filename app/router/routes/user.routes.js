const express = require("express");
const { authGuard } = require("../../middleware/authGuard");
const {
  toggleUserByAdmin,
  getAllFreelancersByAdmin,
  getAllEmployeeByAdmin,
  adminSystemData
} = require("../../controller/user.controller");

const router = express.Router();

router.patch("/admin/toggleUserByAdmin", authGuard, toggleUserByAdmin);
router.get("/admin/getAllFreelancersByAdmin", authGuard, getAllFreelancersByAdmin);
router.get("/admin/getAllEmployeeByAdmin", authGuard, getAllEmployeeByAdmin);
router.get("/admin/adminSystemData", authGuard, adminSystemData);

module.exports = router;
