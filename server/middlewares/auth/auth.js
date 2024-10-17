const useAsyncWrapper = require("../../utils/useAsyncWrapper");
const Client_Error = require("../errorhandling/User_Agent_Error_Class");
const jwt = require("jsonwebtoken");
const { jwt_security_key } = require("../../config/env.config");

const auth = useAsyncWrapper(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    const err = new Client_Error("Unauthorized", 401);
    return next(err);
  }
  const verified = jwt.verify(token, jwt_security_key);
  req.admin = verified.admin;
  next();
});

module.exports = auth;
