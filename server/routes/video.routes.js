const express = require("express");
const { videoController } = require("../controllers/controllers");
const router = express.Router();
const uploadFile = require("../middlewares/filehandling/uploadFile");
const { video_files } = require("../config/env.config");
const auth = require("../middlewares/auth/auth");

router
  .route("/")
  .get(videoController.getAllDocuments)
  .post(
    auth,
    uploadFile(video_files).videoFileUpload,
    videoController.createDocument
  );
router
  .route("/:id")
  .get(videoController.getOneDocument)
  .put(
    auth,
    uploadFile(video_files).videoFileUpload,
    videoController.updateDocument
  )
  .delete(auth, videoController.deleteDocument);

module.exports = router;
