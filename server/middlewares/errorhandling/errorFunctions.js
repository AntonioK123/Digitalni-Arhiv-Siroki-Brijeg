const Client_Error = require("./User_Agent_Error_Class");

const url_not_found_error = (req, res, next) => {
  const err = new Client_Error(
    `The requested URL ${req.originalUrl} was not found on the server`,
    404
  );
  next(err);
};

const validationErrors = (err) => {
  const errors = Object.values(err.errors).map((val) => val.path);
  const messageVal = errors.length === 2 ? " and " : " , ";
  const errorMessages = errors.join(messageVal);
  const field = errors.length < 2 ? "field" : "fields";
  const msg = `Invalid input data: ${errorMessages} ${field} is required`;

  return new Client_Error(msg, 400);
};

module.exports = { url_not_found_error, validationErrors };
