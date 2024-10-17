const app = require("./config/app.config");
const config = require("./config/env.config");
const dbConnection = require("./config/db.config");

//Database Connection
dbConnection();

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
