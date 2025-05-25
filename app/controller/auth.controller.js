const { hashPassword, comparePasswords } = require("../config/bcrypt");
const { generateJwt, verifyJwt } = require("../config/jwt");
const sendMail = require("../config/nodemailer");
const { InternalServerError, handleResponse } = require("../helpers/response");
const { loggerResponse } = require("../helpers/logger/response");
const {
  signUpSchema,
  signInSchema,
  resetPasswordSchema,
  varifyAccountSchema,
  forgotPasswordSchema,
} = require("../validations/auth.joi");
const { validateSchema } = require("../helpers/validate");

const db = require("../model");
const { sequelize } = require("../config/db");
const { role, users } = db;

const signUp = async (req, res) => {
  const { name, email, password, confirmPassword, role: roleName } = req.body;
  let t = null

  try {
    t = await sequelize.transaction();
    const { error: schemaErrors } = validateSchema(signUpSchema, req.body);
    if (schemaErrors) {
      loggerResponse({
        type: "error",
        message: `invalid body ${schemaErrors}`,
      });
      return handleResponse(res, schemaErrors);
    }

    if (password !== confirmPassword) {
      loggerResponse({
        type: "error",
        message: "password does not match ",
      });
      return res.status(400).json({
        status: false,
        message: "password does not match ",
      });
    }
    const userExists = await users.findOne({
      where: {
        email,
      },
    });
    if (userExists) {
      loggerResponse({
        type: "error",
        message: "email is taken",
      });
      return res.status(400).json({
        status: false,
        message: "email is taken",
      });
    }
    const encryptedPassword = await hashPassword(password);

    const userRole = await role.findOne({
      where: {
        name: roleName,
      },
    });

    const newUser = await users.create({
      name,
      email,
      password: encryptedPassword,
      is_varified: false,
      is_banned: false,
      role_id: userRole?.id,
    });

    const token = generateJwt({ id: newUser.id, role: userRole?.name });
    const sendMailDto = {
      to: email,
      subject: "Account Activation",
      text: "Click on this link to Activate Account",
      html: `<a>localhost:4000/api/auth/varifyAccount?token=${token}</a>`,
    };
    await sendMail(sendMailDto);

    loggerResponse({
      type: "info",
      message: "Please check your mail to verify your account.",
    });
    await t.commit();

    return res.status(200).json({
      status: true,
      message: "Please check your mail to verify your account.",
      sendMailDto,
    });
  } catch (error) {
    await t.rollback();
    loggerResponse({
      type: "error",
      message: `internal server error in createUser Api`,
      res: error,
    });
    return InternalServerError(res, error);
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error: schemaErrors } = validateSchema(signInSchema, req.body);
    if (schemaErrors) {
      loggerResponse({
        type: "error",
        message: `invalid body ${schemaErrors}`,
      });
      return handleResponse(res, schemaErrors);
    }

    let userExists = await users.findOne({
      where: {
        email,
      },
    });

    if (!userExists) {
      loggerResponse({
        type: "error",
        message: "invalid credentials",
      });
      return res.status(400).json({
        status: false,
        message: "invalid credentials",
      });
    }

    if (!userExists.is_verified) {
      loggerResponse({
        type: "error",
        message: "your account is not activated, please activate your account",
      });

      return res.status(400).json({
        status: false,
        message: "your account is not activated, please activate your account",
      });
    }

    if (userExists.is_banned) {
      loggerResponse({
        type: "error",
        message: "your account is Banned",
      });

      return res.status(400).json({
        status: false,
        message: "your account is Banned",
      });
    }

    const isPasswordMatch = await comparePasswords(
      password,
      userExists.password
    );

    if (!isPasswordMatch) {
      loggerResponse({
        type: "error",
        message: "invalid credentials",
      });
      return res.status(400).json({
        status: false,
        message: "invalid credentials",
      });
    }

    const roleName = await role.findOne({
      where: {
        id: userExists?.role_id,
      },
    });

    const token = generateJwt({ id: userExists.id, role: roleName?.name });

    const updatedUser = await users.update(
      { token },
      {
        where: { id: userExists.id },
        returning: true,
        plain: true,
      }
    );

    const updatedRecord = updatedUser[1];

    loggerResponse({
      type: "info",
      message: "login successfull",
    });

    return res.status(200).json({
      status: true,
      message: "login successfull",
      user: updatedRecord,
      token,
    });
  } catch (error) {
    loggerResponse({
      type: "error",
      message: `internal server error in createUser Api`,
      res: error,
    });
    return InternalServerError(res, error);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const { error: schemaErrors } = validateSchema(forgotPasswordSchema, req.body);

    if (schemaErrors) {
      loggerResponse({
        type: "error",
        message: `invalid body ${schemaErrors}`,
      });
      return handleResponse(res, schemaErrors);
    }

    const userExists = await users.findOne({
      where: {
        email,
      },
    });


    if (!userExists) {
      loggerResponse({
        type: "error",
        message: "User not found",
      });

      if (!userExists.is_verified) {
        loggerResponse({
          type: "error",
          message: "your account is not activated, please activate your account",
        });

        return res.status(400).json({
          status: false,
          message: "your account is not activated, please activate your account",
        });
      }

      if (userExists.is_banned) {
        loggerResponse({
          type: "error",
          message: "your account is Banned",
        });

        return res.status(400).json({
          status: false,
          message: "your account is Banned",
        });
      }

      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }

    const roleName = await role.findOne({
      where: {
        id: userExists?.role_id,
      },
    });

    const token = generateJwt({ id: userExists.id, role: roleName });
    const sendMailDto = {
      to: email,
      subject: "Account Password Reset",
      text: "Click on this link to reset password",
      html: `<a>localhost:4000/api/auth/resetPassword?token=${token}</a>`,
    };

    await sendMail(sendMailDto);

    loggerResponse({
      type: "info",
      message: "email has been sent to reset your password",
    });

    return res.status(200).json({
      status: true,
      message: "email has been sent to reset your password",
      sendMailDto,
    });
  } catch (error) {
    loggerResponse({
      type: "error",
      message: `internal server error`,
      res: error,
    });
    return InternalServerError(res, error);
  }
};

const resetPassword = async (req, res) => {
  const { password = "", confirmPassword = "" } = req?.body;
  const { token = "" } = req?.query;

  try {
    const { error: schemaErrors } = validateSchema(resetPasswordSchema, {
      ...req?.body,
      ...req?.query,
    });

    if (schemaErrors) {
      loggerResponse({
        type: "error",
        message: `invalid body ${schemaErrors}`,
      });
      return handleResponse(res, schemaErrors);
    }

    if (password !== confirmPassword) {
      loggerResponse({
        type: "error",
        message: "password does not match ",
      });
      return res.status(400).json({
        status: false,
        message: "password does not match ",
      });
    }

    const verifiedUser = verifyJwt(token);

    const user = await users.findByPk(verifiedUser?.id);
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }

    if (!user.is_verified) {
      loggerResponse({
        type: "error",
        message: "your account is not activated, please activate your account",
      });

      return res.status(400).json({
        status: false,
        message: "your account is not activated, please activate your account",
      });
    }

    if (user.is_banned) {
      loggerResponse({
        type: "error",
        message: "your account is Banned",
      });

      return res.status(400).json({
        status: false,
        message: "your account is Banned",
      });
    }

    const encryptedPassword = await hashPassword(password);

    const [_, [userData]] = await users.update(
      { password: encryptedPassword },
      {
        where: { id: verifiedUser?.id },
        returning: true,
      }
    );

    loggerResponse({
      type: "info",
      message: "User password has been reset",
    });

    return res.status(200).json({
      status: true,
      message: "User password has been reset",
      user: userData,
    });
  } catch (error) {
    loggerResponse({
      type: "error",
      message: `internal server error in createUser Api`,
      res: error,
    });
    return InternalServerError(res, error);
  }
};

const varifyAccount = async (req, res) => {
  const { token } = req.query;
  try {
    const { error: schemaErrors } = validateSchema(varifyAccountSchema, req.query);

    if (schemaErrors) {
      loggerResponse({
        type: "error",
        message: `invalid body ${schemaErrors}`,
      });
      return handleResponse(res, schemaErrors);
    }

    const verifiedUser = verifyJwt(token);

    const user = await users.findByPk(verifiedUser?.id);

    if (!user) {
      loggerResponse({
        type: "error",
        message: "User not found",
      });
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }

    const [_, [userData]] = await users.update(
      { is_verified: true },
      {
        where: { id: verifiedUser?.id },
        returning: true,
      }
    );

    loggerResponse({
      type: "info",
      message: "Account has been activated",
    });

    return res.status(200).json({
      status: true,
      message: "Account has been activated",
      user: userData,
    });
  } catch (error) {
    loggerResponse({
      type: "error",
      message: `internal server error in createUser Api`,
      res: error,
    });
    return InternalServerError(res, error);
  }
};

const logOutUser = async (req, res) => {
  const { id } = req;
  try {
    const [_, [updatedUser]] = await users.update(
      { token: "" },
      {
        where: { id },
        returning: true,
      }
    );

    loggerResponse({
      type: "info",
      message: "User has been logout",
    });

    return res.status(200).json({
      status: true,
      message: "User has been logout",
    });
  } catch (err) {
    loggerResponse({
      type: "error",
      message: `internal server error in createUser Api`,
      res: err,
    });
    return InternalServerError(res, err);
  }
};

module.exports = {
  signIn,
  signUp,
  forgotPassword,
  resetPassword,
  varifyAccount,
  logOutUser,
};
