class Client_Error extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status =
      statusCode >= 400 && statusCode < 500 ? "Client Error" : "Server Error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = Client_Error;
