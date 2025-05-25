const { loggerResponse } = require("../helpers/logger/response");

const db = require("../model");
const { paymentHistory, milestone, users } = db;

const createPaymentHistory = async (req, res) => {
  const { milestone_id, transaction_id } = req.body;

  const { role, id } = req;

  try {
    if (role !== "Admin") {
      loggerResponse({
        type: "error",
        message: "only Admin can create Payment history",
        res: "",
      });

      return res.status(400).json({
        status: false,
        message: "only Admin can create Payment history",
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

    const milestoneExists = await milestone.findByPk(milestone_id);

    if (!milestoneExists) {
      loggerResponse({
        type: "error",
        message: `milestone does not exist`,
        res: "",
      });
      return res
        .status(404)
        .json({ status: false, message: "milestone does not exists" });
    }

    const data = await paymentHistory.create({
      milestone_id,
      transaction_id,
    });

    loggerResponse({
      type: "info",
      message: "paymentHistory has created",
    });

    return res.status(200).json({
      status: true,
      message: "paymentHistory has created",
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

const getAllPaymentHistory = async (req, res) => {
  const { milestone_id } = req.query;

  const { id, role } = req

  try {
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

    const milestoneExists = await milestone.findByPk(milestone_id);

    if (!milestoneExists) {
      loggerResponse({
        type: "error",
        message: `milestone does not exist`,
        res: "",
      });
      return res
        .status(404)
        .json({ status: false, message: `milestone does not exist` });
    }

    const data = await paymentHistory.findAll({
      where: {
        milestone_id,
      },
    });

    if (data?.length === 0) {
      loggerResponse({
        type: "error",
        message: `payment History does not exist`,
        res: "",
      });
      return res
        .status(404)
        .json({ status: false, message: `payment History does not exist` });
    }

    loggerResponse({
      type: "info",
      message: "payment History has fetched",
    });

    return res.status(200).json({
      status: true,
      message: "payment History fetched",
      data,
    });
  } catch (err) {
    loggerResponse({
      type: "error",
      message: `internal server error in getAllContracs Api`,
      res: err,
    });

    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createPaymentHistory,
  getAllPaymentHistory
};
