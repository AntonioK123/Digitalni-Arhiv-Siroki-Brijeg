const fs = require("fs");

const rmSingleFile = (path, resource) => {
  return fs.unlink(`${path}/${resource}`, (err) => {
    if (err) throw err;
  });
};
const rmMultipleFiles = (path, resources) => {
  console.log(resources);
  return resources?.map((r) => {
    fs.unlinkSync(`${path}/${r}`, (err) => {
      if (err) throw err;
    });
  });
};

module.exports = { rmSingleFile, rmMultipleFiles };
