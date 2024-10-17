const express = require("express");
const { posterController } = require("../controllers/controllers");
const router = express.Router();
const uploadFile = require("../middlewares/filehandling/uploadFile");
const { poster_files } = require("../config/env.config");
const auth = require("../middlewares/auth/auth");

router
  .route("/")
  .get(posterController.getAllDocuments)
  .post(
    auth,
    uploadFile(poster_files).posterFileUpload,
    posterController.createDocument
  );
router
  .route("/:id")
  .get(posterController.getOneDocument)
  .put(
    auth,
    uploadFile(poster_files).posterFileUpload,
    posterController.updateDocument
  )
  .delete(auth, posterController.deleteDocument);

module.exports = router;
