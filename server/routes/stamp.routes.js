const express = require("express");
const router = express.Router();
const { stampController } = require("../controllers/controllers");
const { stamp_files } = require("../config/env.config");
const uploadFile = require("../middlewares/filehandling/uploadFile");
const auth = require("../middlewares/auth/auth");

router
  .route("/")
  .get(stampController.getAllDocuments)
  .post(
    auth,
    uploadFile(stamp_files).stampFileUpload,
    stampController.createDocument
  );
router
  .route("/:id")
  .get(stampController.getOneDocument)
  .put(
    auth,
    uploadFile(stamp_files).stampFileUpload,
    stampController.updateDocument
  )
  .delete(auth, stampController.deleteDocument);

module.exports = router;
