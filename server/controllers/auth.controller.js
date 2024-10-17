const useAsyncWrapper = require("../utils/useAsyncWrapper");
const Client_Error = require("../middlewares/errorhandling/User_Agent_Error_Class");
const jwt = require("jsonwebtoken");
const authService = require("../services/auth.service");
const { jwt_security_key } = require("../config/env.config");

const createAdmin = useAsyncWrapper(async (req, res, next) => {
  const data = req.body;

  const { validEmail, result } = await authService.create({ ...data });

  if (validEmail) {
    const err = new Client_Error(
      `Admin with ${validEmail.email} email already exists, please create new admin with another email`,
      400
    );
    return next(err);
  }

  res.status(201).json({
    status: "Created",
    message: `Admin with name ${result.name} is successfully created `,
    data: result,
  });
});

const loginAdmin = useAsyncWrapper(async (req, res, next) => {
  const data = req.body;

  const { invalidEmail, invalidPassword, result } = await authService.login({
    ...data,
  });

  if (invalidEmail) {
    const err = new Client_Error("Admin with this email doesn't exist", 404);
    return next(err);
  }

  if (invalidPassword) {
    const err = new Client_Error("Wrong password. Try again.", 400);
    return next(err);
  }
  
  res.cookie("token", result, { httpOnly: true }).send();
});

const logoutAdmin = useAsyncWrapper(async (req, res, next) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

const loggedInAdmin = useAsyncWrapper(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.send(false);
  }
  jwt.verify(token, jwt_security_key);
  res.send(true);
});

module.exports = { createAdmin, loginAdmin, logoutAdmin, loggedInAdmin };
