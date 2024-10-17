const express = require("express");
const { magazineController } = require("../controllers/controllers");
const router = express.Router();
const uploadFile = require("../middlewares/filehandling/uploadFile");
const { magazine_files } = require("../config/env.config");
const auth = require("../middlewares/auth/auth");

router
  .route("/")
  .get(magazineController.getAllDocuments)
  .post(
    auth,
    uploadFile(magazine_files).magazineFileUpload,
    magazineController.createDocument
  );
router
  .route("/:id")
  .get(magazineController.getOneDocument)
  .put(
    auth,
    uploadFile(magazine_files).magazineFileUpload,
    magazineController.updateDocument
  )
  .delete(auth, magazineController.deleteDocument);

module.exports = router;
