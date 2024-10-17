const fse = require("fs-extra");

const moveFile = (src, dest) => {
  return fse.move(src, dest, { overwrite: true }, (err) => {
    if (err) console.log(err);
  });
};

module.exports = moveFile;
