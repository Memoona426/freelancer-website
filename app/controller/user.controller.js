const { loggerResponse } = require("../helpers/logger/response");

const db = require("../model");
const { users, bids, contract, job, milestone, paymentHistory, role } = db;

const toggleUserByAdmin = async (req, res) => {
  const { userId } = req.query;
  const { id, role } = req;

  try {
    if (role !== "Admin") {
      loggerResponse({
        type: "error",
        message: `only Admin can toggle status of user`,
        res: "",
      });
      return res.status(400).json({
        status: false,
        message: "only Admin can toggle status of user",
      });
    }

    if (id === parseInt(userId)) {
      loggerResponse({
        type: "error",
        message: `cant update its own status`,
        res: "",
      });
      return res.status(400).json({
        status: false,
        message: `cant update its own status`,
      });
    }

    const userExist = await users.findByPk(userId);

    if (!userExist) {
      loggerResponse({
        type: "error",
        message: `user to be update does not exist`,
        res: "",
      });
      return res
        .status(400)
        .json({ status: false, message: `user to be update does not exist`, });
    }

    const [_, [updatedUser]] = await users.update(
      { is_banned: !userExist?.is_banned },
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
      data: updatedUser,
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
  let { role: roleName, id } = req;
  let { page = 1, rowPerPageLimit = 10 } = req.query;
  try {
    if (roleName !== "Admin") {
      loggerResponse({
        type: "error",
        message: `Only for Admin`,
        res: "",
      });

      return res
        .status(400)
        .json({ status: false, message: `Only for admin` });
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

    page = parseInt(page);
    rowPerPageLimit = parseInt(rowPerPageLimit);

    const offset = (page - 1) * rowPerPageLimit;

    const findEmployeerRoleId = await role.findOne({
      where: { name: "Employer" },
    });

    const totalEmployer = await users.count({
      where: { role_id: findEmployeerRoleId?.id },
    });

    const data = await users.findAll({
      where: { role_id: findEmployeerRoleId?.id },
      offset,
      limit: rowPerPageLimit,
    });

    loggerResponse({
      type: "info",
      message: `fetch all users`,
    });

    return res.status(200).json({
      status: true,
      message: "fetch all users",
      data,
      totalEmployer,
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
  let { role: roleName, id } = req;
  let { page = 1, rowPerPageLimit = 10 } = req.query;
  try {
    if (roleName !== "Admin") {
      loggerResponse({
        type: "error",
        message: `Only for Admin`,
        res: "",
      });

      return res
        .status(400)
        .json({ status: false, message: `Only for admin` });
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

    page = parseInt(page);
    rowPerPageLimit = parseInt(rowPerPageLimit);

    const offset = (page - 1) * rowPerPageLimit;

    const findFreelancerRoleId = await role.findOne({
      where: { name: "Freelancer" },
    });

    const totalFreelancer = await users.count({
      where: { role_id: findFreelancerRoleId?.id },
    });

    const data = await users.findAll({
      where: { role_id: findFreelancerRoleId?.id },
      offset,
      limit: rowPerPageLimit,
    });

    loggerResponse({
      type: "info",
      message: `fetch all users`,
    });

    return res.status(200).json({
      status: true,
      message: "fetch all users",
      data,
      totalFreelancer,
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

const adminSystemData = async (req, res) => {
  let { id, role: roleName } = req;
  try {
    if (roleName !== "Admin") {
      loggerResponse({
        type: "error",
        message: `Only for admin`,
        res: "",
      });

      return res
        .status(400)
        .json({ status: false, message: `Only for admin` });
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

    const findEmployeerRoleId = await role.findOne({
      where: { name: "Employer" },
    });

    const findFreelancerRoleId = await role.findOne({
      where: { name: "Freelancer" },
    });

    const totalEmployer = await users.count({
      where: { role_id: findEmployeerRoleId?.id },
    });

    const totalFreelancer = await users.count({
      where: { role_id: findFreelancerRoleId?.id },
    });

    const totalContracts = await contract.count();
    const totalMileStone = await milestone.count();
    const totalPaymentHistory = await paymentHistory.count();
    const totalBids = await bids.count();
    const totalJobs = await job.count();

    loggerResponse({
      type: "info",
      message: `fetch all adminSystemData`,
    });

    return res.status(200).json({
      status: true,
      message: "fetch all adminSystemData",
      totalEmployer,
      totalFreelancer,
      totalContracts,
      totalMileStone,
      totalPaymentHistory,
      totalBids,
      totalJobs,
    });
  } catch (err) {
    loggerResponse({
      type: "error",
      message: `internal server error in adminSystemData Api`,
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
  adminSystemData,
};
