const fs = require("fs");

const createFolder = (path, resource) => {
  return fs.mkdirSync(`${path}/${resource}`, (err) => {
    if (err) throw err;
  });
};

module.exports = createFolder;
