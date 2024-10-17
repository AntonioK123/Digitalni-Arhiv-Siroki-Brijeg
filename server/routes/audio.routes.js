const express = require("express");
const { audioController } = require("../controllers/controllers");
const router = express.Router();
const uploadFile = require("../middlewares/filehandling/uploadFile");
const { audio_files } = require("../config/env.config");
const auth = require("../middlewares/auth/auth");

router
  .route("/")
  .get(audioController.getAllDocuments)
  .post(
    auth,
    uploadFile(audio_files).audioFileUpload,
    audioController.createDocument
  );
router
  .route("/:id")
  .get(audioController.getOneDocument)
  .put(
    auth,
    uploadFile(audio_files).audioFileUpload,
    audioController.updateDocument
  )
  .delete(auth, audioController.deleteDocument);

module.exports = router;
