const express = require("express");
const { documentController } = require("../controllers/controllers");
const router = express.Router();
const uploadFile = require("../middlewares/filehandling/uploadFile");
const { document_files } = require("../config/env.config");
const auth = require("../middlewares/auth/auth");

router
  .route("/")
  .get(documentController.getAllDocuments)
  .post(
    auth,
    uploadFile(document_files).documentFileUpload,
    documentController.createDocument
  );
router
  .route("/:id")
  .get(documentController.getOneDocument)
  .put(
    auth,
    uploadFile(document_files).documentFileUpload,
    documentController.updateDocument
  )
  .delete(auth, documentController.deleteDocument);

module.exports = router;
