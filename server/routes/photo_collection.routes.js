const express = require("express");
const { photoCollectionController } = require("../controllers/controllers");
const router = express.Router();
const uploadFile = require("../middlewares/filehandling/uploadFile");
const { photo_collection_files } = require("../config/env.config");
const auth = require("../middlewares/auth/auth");

router
  .route("/")
  .get(photoCollectionController.getAllCollections)
  .post(auth, photoCollectionController.createCollection);
router
  .route("/:collectionId")
  .get(photoCollectionController.getOneCollection)
  .put(auth, photoCollectionController.updateCollection)
  .delete(auth, photoCollectionController.deleteCollection);

router
  .route("/:collectionId/photos")
  .get(photoCollectionController.getAllDocuments)
  .post(
    auth,
    uploadFile(photo_collection_files).photoFileUpload,
    photoCollectionController.createDocument
  );

router
  .route("/:collectionId/photos/:documentId")
  .get(photoCollectionController.getOneDocument)
  .put(
    auth,
    uploadFile(photo_collection_files).photoFileUpload,
    photoCollectionController.updateDocument
  )
  .delete(auth, photoCollectionController.deleteDocument);

module.exports = router;
