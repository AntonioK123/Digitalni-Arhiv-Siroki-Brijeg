const { validationErrors } = require("./errorFunctions");

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (error.name === "ValidationError") {
    error = validationErrors(error);
  }
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "Internal server error",
      message: "Something went wrong! Please try again later",
      error: error.name,
      er: error.stack,
    });
  }
};
