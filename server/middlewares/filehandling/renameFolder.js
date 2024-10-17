const fs = require("fs");

const renameFolder = (path, resource, newResource) => {
  return fs.renameSync(
    `${path}/${resource}`,
    `${path}/${newResource}`,
    (err) => {
      if (err) throw err;
    }
  );
};

module.exports = renameFolder;
