const express = require("express");
const { bookController } = require("../controllers/controllers");
const router = express.Router();
const uploadFile = require("../middlewares/filehandling/uploadFile");
const { book_files } = require("../config/env.config");
const auth = require("../middlewares/auth/auth");

router
  .route("/")
  .get(bookController.getAllDocuments)
  .post(
    auth,
    uploadFile(book_files).bookFileUpload,
    bookController.createDocument
  );
router
  .route("/:id")
  .get(bookController.getOneDocument)
  .put(
    auth,
    uploadFile(book_files).bookFileUpload,
    bookController.updateDocument
  )
  .delete(auth, bookController.deleteDocument);

module.exports = router;
