const fs = require("fs");

const rmFolder = (path, resource) => {
  return fs.rmSync(
    `${path}/${resource}`,
    { recursive: true, force: true },
    (err) => {
      if (err) throw err;
    }
  );
};

module.exports = rmFolder;
