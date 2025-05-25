const express = require("express");
const router = express.Router();

const authRoutes = require("./routes/auth.routes");
const userProfileRoutes = require("./routes/userProfile.routes");
const userRoutes = require("./routes/user.routes");
const bidsRoutes = require("./routes/bids.routes");
const jobsRoutes = require("./routes/job.routes");
const milestoneRoutes = require("./routes/milestone.routes");
const contractRoutes = require("./routes/contract.routes");
const paymentHistoryRoutes = require("./routes/paymentHistory.routes");
const messagesRoutes = require("./routes/messages.routes");

router.use("/auth", authRoutes);
router.use("/user/profile", userProfileRoutes);
router.use("/user", userRoutes);
router.use("/bids", bidsRoutes);
router.use("/jobs", jobsRoutes);
router.use("/milestone", milestoneRoutes);
router.use("/contracts", contractRoutes);
router.use("/paymentHistoryRoutes", paymentHistoryRoutes);
router.use("/chat", messagesRoutes);

module.exports = router;
