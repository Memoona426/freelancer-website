const { loggerResponse } = require("../helpers/logger/response");
const { notifyMilestoneUpdate } = require("../helpers/notificationService");

const db = require("../model");
const { contract, milestone } = db;

const createMileStone = async (req, res) => {
  const { contract_id, title = "", amount = 0, status = "" } = req.body;

  const { role, id } = req;

  try {
    if (role !== "Employeer") {
      loggerResponse({
        type: "error",
        message: "only Employeer can create MileStone",
        res: "",
      });

      return res.status(400).json({
        status: false,
        message: "only Employeer can create MileStone",
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

    const data = await milestone.create({
      contract_id,
      title,
      amount,
      status,
    });

    loggerResponse({
      type: "info",
      message: "milestone has created",
    });

    return res.status(200).json({
      status: true,
      message: "milestone has created",
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

const getAllMileStone = async (req, res) => {
  const { contract_id } = req.query;

  try {
    const contarct = await contract.findByPk(contract_id);
    if (!contarct) {
      loggerResponse({
        type: "error",
        message: `contract does not exist`,
        res: "",
      });
      return res
        .status(404)
        .json({ status: false, message: `contract does not exist` });
    }
    const data = await milestone.findAll({
      where: {
        contract_id,
      },
    });

    if (data?.length === 0) {
      loggerResponse({
        type: "error",
        message: `user does not exist`,
        res: "",
      });
      return res
        .status(404)
        .json({ status: false, message: `user does not exist` });
    }

    loggerResponse({
      type: "info",
      message: "milestone has fetched",
    });

    return res.status(200).json({
      status: true,
      message: "milestone fetched",
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

const updateMileStone = async (req, res) => {
  const { status = "", milestone_id } = req.body;

  const { role, id } = req;

  try {
    if (role === "Employeer" && !status.includes("pending", "approved")) {
      loggerResponse({
        type: "error",
        message:
          "only Employeer can update contract status (pending, approved)",
        res: "",
      });

      return res.status(400).json({
        status: false,
        message:
          "only Employeer can update contract status (pending, approved)",
      });
    }

    if (role === "Freelancer" && !status.includes("in_progress", "submitted")) {
      loggerResponse({
        type: "error",
        message:
          "only Freelancer can update contract status (in_progress, submitted)",
        res: "",
      });

      return res.status(400).json({
        status: false,
        message:
          "only Freelancer can update contract status (in_progress, submitted)",
      });
    }

    if (
      role === "Admin" &&
      !status.includes("released", "funded_in_progress")
    ) {
      loggerResponse({
        type: "error",
        message:
          "only Admin can update contract status (released, funded_in_progress)",
        res: "",
      });

      return res.status(400).json({
        status: false,
        message:
          "only Admin can update contract status (released, funded_in_progress)",
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

    const [_, [data]] = await milestone.update(
      { status },
      {
        where: { id: milestone_id },
        returning: true,
      }
    );

    if (role === "Admin" || role === "Employeer") {
      const findContract = await contract.findByPk(data.contract_id);

      await notifyMilestoneUpdate({
        job_id: data.id,
        title: data.title,
        amount: data.amount,
        contract_id: data.contract_id,
        user_id: findContract.user_id,
        status,
      });
    }

    loggerResponse({
      type: "info",
      message: "milestone has updated",
    });

    return res.status(200).json({
      status: true,
      message: "milestone has updated",
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
  createMileStone,
  getAllMileStone,
  updateMileStone,
};
