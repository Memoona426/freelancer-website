const { loggerResponse } = require("../helpers/logger/response");

const db = require("../model");
const { contract } = db;

const createContract = async (req, res) => {
  const { status = "", user_id, job_id } = req.body;

  const { role, id } = req;

  try {
    if (role !== "Employeer") {
      loggerResponse({
        type: "error",
        message: "only Employeer can create contract",
        res: "",
      });

      return res.status(400).json({
        status: false,
        message: "only Employeer can create contract",
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

    const data = await contract.create({
      job_id,
      user_id,
      status,
    });

    loggerResponse({
      type: "info",
      message: "contract has created",
    });

    return res.status(200).json({
      status: true,
      message: "contract has created",
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

const getAllContracs = async (req, res) => {
  const { role, id } = req;

  try {
    if (role !== "Employeer") {
      loggerResponse({
        type: "error",
        message: "only Employeer can get contract",
        res: "",
      });

      return res.status(400).json({
        status: false,
        message: "only Employeer can get contract",
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

    const data = await contract.findAll({
      where: {
        user_id: id,
      },
    });

    loggerResponse({
      type: "info",
      message: "contract has fetched",
    });

    return res.status(200).json({
      status: true,
      message: "contract fetched",
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

const updateContarct = async (req, res) => {
  const { status = "", contract_id } = req.body;

  const { role, id } = req;

  try {
    if (role !== "Employeer") {
      loggerResponse({
        type: "error",
        message: "only Employeer can update contract",
        res: "",
      });

      return res.status(400).json({
        status: false,
        message: "only Employeer can update contract",
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

    const [_, [data]] = await contract.update(
      { status },
      {
        where: { contract_id },
        returning: true,
      }
    );

    loggerResponse({
      type: "info",
      message: "contract has updated",
    });

    return res.status(200).json({
      status: true,
      message: "contract has updated",
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
  createContract,
  getAllContracs,
  updateContarct,
};
