//Database Connection

const mongoose = require("mongoose");
const config = require("./env.config");

const dbConnection = () => {
  mongoose.connect(config.db_connection_local);
};

module.exports = dbConnection;
