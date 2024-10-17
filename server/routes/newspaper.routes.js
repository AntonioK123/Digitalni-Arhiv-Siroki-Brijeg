const express = require("express");
const { newspaperController } = require("../controllers/controllers");
const router = express.Router();
const uploadFile = require("../middlewares/filehandling/uploadFile");
const { newspaper_files } = require("../config/env.config");
const auth = require("../middlewares/auth/auth");

router
  .route("/")
  .get(newspaperController.getAllDocuments)
  .post(
    auth,
    uploadFile(newspaper_files).newspaperFileUpload,
    newspaperController.createDocument
  );
router
  .route("/:id")
  .get(newspaperController.getOneDocument)
  .put(
    auth,
    uploadFile(newspaper_files).newspaperFileUpload,
    newspaperController.updateDocument
  )
  .delete(auth, newspaperController.deleteDocument);

module.exports = router;
