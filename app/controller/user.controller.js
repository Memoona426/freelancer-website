const { loggerResponse } = require("../helpers/logger/response");

const db = require("../model");
const { users } = db;

const toggleUserByAdmin = async (req, res) => {
  const { userId } = req.query;
  const { role } = req;

  try {
    if (role !== "admin") {
      loggerResponse({
        type: "error",
        message: `only admin can toggle status of user`,
        res: "",
      });
      return res.status(400).json({
        status: false,
        message: "only admin can toggle status of user",
      });
    }

    const userExist = await users.findByPk(userId);

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

    if (userExist.role !== "user") {
      loggerResponse({
        type: "error",
        message: `Only toggle status of user`,
        res: "",
      });

      return res
        .status(400)
        .json({ status: false, message: `Only toggle status of user` });
    }

    const [_, [updatedUser]] = await users.update(
      { is_banned: !userExist },
      {
        where: { id: userId },
        returning: true,
      }
    );

    loggerResponse({
      type: "info",
      message: `user status has been toggle`,
    });

    return res.status(200).json({
      status: true,
      message: "user status has been toggle",
      user: updatedUser,
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

const getAllEmployeeByAdmin = async (req, res) => {
  let { role } = req;
  let { page = 1, rowPerPageLimit = 10 } = req.query;
  try {
    if (role !== "admin") {
      loggerResponse({
        type: "error",
        message: `Only for admin`,
        res: "",
      });

      return res
        .status(400)
        .json({ status: false, message: `Only for Super admin` });
    }

    page = parseInt(page);
    rowPerPageLimit = parseInt(rowPerPageLimit);

    const totalUser = await users.count({
      where: { role: "Employer" },
    });

    const users = await users.findAll({
      where: { role: "Employer" },
      offset,
      limit,
    });

    loggerResponse({
      type: "info",
      message: `fetch all users`,
    });

    return res.status(200).json({
      status: true,
      message: "fetch all users",
      users,
      totalUser,
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

const getAllFreelancersByAdmin = async (req, res) => {
  let { role } = req;
  let { page = 1, rowPerPageLimit = 10 } = req.query;
  try {
    if (role !== "admin") {
      loggerResponse({
        type: "error",
        message: `Only for admin`,
        res: "",
      });

      return res
        .status(400)
        .json({ status: false, message: `Only for Super admin` });
    }

    page = parseInt(page);
    rowPerPageLimit = parseInt(rowPerPageLimit);

    const totalUser = await users.count({
      where: { role: "Freelancer" },
    });

    const users = await users.findAll({
      where: { role: "Freelancer" },
      offset,
      limit,
    });

    loggerResponse({
      type: "info",
      message: `fetch all users`,
    });

    return res.status(200).json({
      status: true,
      message: "fetch all users",
      users,
      totalUser,
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
  toggleUserByAdmin,
  getAllEmployeeByAdmin,
  getAllFreelancersByAdmin,
};
