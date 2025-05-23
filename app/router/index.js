const express = require("express");
const router = express.Router();

const authRoutes = require("./routes/auth.routes");
const userProfileRoutes = require("./routes/userProfile.routes");
const userRoutes = require("./routes/user.routes");
const bidsRoutes = require("./routes/bids.routes");
const jobsRoutes = require("./routes/job.routes");
const milestone = require("./routes/milestone.routes");

router.use("/auth", authRoutes);
router.use("/user/profile", userProfileRoutes);
router.use("/user", userRoutes);
router.use("/bids", bidsRoutes);
router.use("/jobs", jobsRoutes);
router.use("/milestone", milestone);

module.exports = router;
