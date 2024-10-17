const express = require("express");
const { postcardController } = require("../controllers/controllers");
const router = express.Router();
const uploadFile = require("../middlewares/filehandling/uploadFile");
const { postcard_files } = require("../config/env.config");
const auth = require("../middlewares/auth/auth");

router
  .route("/")
  .get(postcardController.getAllDocuments)
  .post(
    auth,
    uploadFile(postcard_files).postcardFileUpload,
    postcardController.createDocument
  );
router
  .route("/:id")
  .get(postcardController.getOneDocument)
  .put(
    auth,
    uploadFile(postcard_files).postcardFileUpload,
    postcardController.updateDocument
  )
  .delete(auth, postcardController.deleteDocument);

module.exports = router;
