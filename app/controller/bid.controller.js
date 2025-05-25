const { loggerResponse } = require("../helpers/logger/response");
const {
  notifyNewJobPosted,
  notifyNewBid,
} = require("../helpers/notificationService");

const db = require("../model");
const { job, bids, users } = db;

const createBidByFreelancer = async (req, res) => {
  const { proposal = "", bid_amount = 0, job_id } = req.body;

  const { role, id } = req;

  try {
    if (role !== "Freelancer") {
      loggerResponse({
        type: "error",
        message: "only Freelancer can bid job",
        res: "",
      });

      return res.status(400).json({
        status: false,
        message: "only Freelancer can create job",
      });
    }

    const userExist = await users.findByPk(id);

    if (!userExist) {
      loggerResponse({
        type: "error",
        message: `user does not exist`,
        res: "",
      });
      return res
        .status(400)
        .json({ status: false, message: "user does not exists" });
    }

    const jobExist = await job.findByPk(job_id);

    if (!jobExist) {
      loggerResponse({
        type: "error",
        message: `job does not exist`,
        res: "",
      });
      return res
        .status(400)
        .json({ status: false, message: "job does not exists" });
    }

    const data = await bids.create({
      job_id,
      user_id: id,
      proposal,
      status: "pending",
      bid_amount,
    });

    // await notifyNewBid({
    //   employeer_id: jobExist?.user_id,
    //   job_id,
    //   user_id: id,
    //   proposal,
    //   status,
    //   bid_amount,
    // });

    loggerResponse({
      type: "info",
      message: "bid has created",
    });

    return res.status(200).json({
      status: true,
      message: "bid has created",
      data,
    });
  } catch (err) {
    loggerResponse({
      type: "error",
      message: `internal server error in createUser Api`,
      res: err,
    });

    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const reviewBidByExployeer = async (req, res) => {
  const { job_id } = req.query;

  const { role, id } = req;

  try {
    if (role !== "Employer") {
      loggerResponse({
        type: "error",
        message: "only Employer review bid",
        res: "",
      });

      return res.status(400).json({
        status: false,
        message: "only Employer review bid",
      });
    }

    const userExist = await users.findByPk(id);

    if (!userExist) {
      loggerResponse({
        type: "error",
        message: `user does not exist`,
        res: "",
      });
      return res
        .status(400)
        .json({ status: false, message: "user does not exists" });
    }

    const data = await bids.findAll({
      where: { job_id, user_id: id },
      include: [{ model: User, as: "Users" }],
    });

    return res.status(200).json({
      status: true,
      message: "Fetched Bids for review",
      data,
    });
  } catch (err) {
    loggerResponse({
      type: "error",
      message: `internal server error in createUser Api`,
      res: err,
    });

    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createBidByFreelancer,
  reviewBidByExployeer,
};
