const useAsyncWrapper = require("../../utils/useAsyncWrapper");
const Client_Error = require("../errorhandling/User_Agent_Error_Class");

const adminCreation = useAsyncWrapper(async (req, res, next) => {
  const { name, email, password, passwordVerify } = req.body;

  if (!name || !email || !password || !passwordVerify) {
    const err = new Client_Error(
      `Name , Email , Password and PasswordVerify , are required. Please try again.`,
      400
    );
    return next(err);
  }

  if (password !== passwordVerify) {
    const err = new Client_Error("Please confirm password", 400);
    return next(err);
  }

  next();
});

const validLogin = useAsyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    const err = new Client_Error("Email is required", 400);
    return next(err);
  }
  if (!password) {
    const err = new Client_Error("Password is required", 400);
    return next(err);
  }

  next();
});

module.exports = { adminCreation, validLogin };
