const { loggerResponse } = require("../helpers/logger/response");
const { notifyNewJobPosted } = require("../helpers/notificationService");

const db = require("../model");
const { job } = db;

const postJobsByEmployer = async (req, res) => {
  const {
    title = "",
    description = "",
    budget_type = "",
    budget = 0,
    skill_required = {},
    deadline = Date.now(),
  } = req.body;

  const { role, id } = req;

  try {
    if (role !== "Employer") {
      loggerResponse({
        type: "error",
        message: "only Employer can create job",
        res: "",
      });

      return res.status(400).json({
        status: false,
        message: "only Employer can create job",
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

    const data = await job.create({
      user_id: id,
      title,
      description,
      budget_type,
      budget,
      skill_required,
      deadline,
    });

    await notifyNewJobPosted({
      job_id: data.id,
      title,
      description,
      budget_type,
      budget,
      skill_required,
      deadline,
    });

    loggerResponse({
      type: "info",
      message: "Job has created",
    });

    return res.status(200).json({
      status: true,
      message: "Job has created",
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

const applyJobByFreelancer = async (req, res) => {
  const {
    title = "",
    description = "",
    budget_type = "",
    budget = 0,
    skill_required = {},
    deadline = Date.now(),
  } = req.body;

  const { role, id } = req;

  try {
    if (role !== "Employer") {
      loggerResponse({
        type: "error",
        message: "only Employer can create job",
        res: "",
      });

      return res.status(400).json({
        status: false,
        message: "only Employer can create job",
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

    const data = await job.create({
      user_id: id,
      title,
      description,
      budget_type,
      budget,
      skill_required,
      deadline,
    });

    loggerResponse({
      type: "info",
      message: "Job has created",
    });

    return res.status(200).json({
      status: true,
      message: "Job has created",
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
  postJobsByEmployer,
  applyJobByFreelancer,
};
