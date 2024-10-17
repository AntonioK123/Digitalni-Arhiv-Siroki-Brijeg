const multer = require("multer");

const uploadFile = (path) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const fieldsInit = (
    a = { name: "file[]", maxCount: 1 },
    b = { name: "additionalFiles[]", maxCount: 1 }
  ) => {
    return multer({ storage: storage }).fields([a, b]);
  };

  const audioFileUpload = fieldsInit(
    { name: "file[]", maxCount: 30 },
    { name: "additionalFiles[]", maxCount: 30 }
  );

  const bookFileUpload = fieldsInit();
  const documentFileUpload = fieldsInit();
  const magazineFileUpload = fieldsInit();
  const newspaperFileUpload = fieldsInit();
  const photoFileUpload = fieldsInit();
  const postcardFileUpload = fieldsInit();
  const posterFileUpload = fieldsInit();
  const stampFileUpload = fieldsInit();
  const videoFileUpload = fieldsInit();

  return {
    audioFileUpload,
    bookFileUpload,
    documentFileUpload,
    magazineFileUpload,
    newspaperFileUpload,
    photoFileUpload,
    postcardFileUpload,
    posterFileUpload,
    stampFileUpload,
    videoFileUpload,
  };
};

module.exports = uploadFile;
