const DocumentController = require("./documentControllerClass.controller");
const {
  audio_files,
  book_files,
  document_files,
  magazine_files,
  newspaper_files,
  photo_collection_files,
  postcard_files,
  poster_files,
  stamp_files,
  video_files,
} = require("../config/env.config");

const {
  audioService,
  bookService,
  documentService,
  magazineService,
  newspaperService,
  photoCollectionService,
  postcardService,
  posterService,
  stampService,
  videoService,
} = require("../services/services");
const CollectionController = require("./collectionControllerClass.controller");
const dbController = require("./dbController");
const controllers = {
  audioController: new DocumentController(audioService, "audio", audio_files),
  bookController: new DocumentController(bookService, "book", book_files),
  documentController: new DocumentController(
    documentService,
    "document",
    document_files
  ),
  magazineController: new DocumentController(
    magazineService,
    "magazine",
    magazine_files
  ),
  newspaperController: new DocumentController(
    newspaperService,
    "newspaper",
    newspaper_files
  ),
  photoCollectionController: new CollectionController(
    photoCollectionService,
    "photo",
    photo_collection_files
  ),
  postcardController: new DocumentController(
    postcardService,
    "postcard",
    postcard_files
  ),
  posterController: new DocumentController(
    posterService,
    "poster",
    poster_files
  ),
  stampController: new DocumentController(stampService, "stamp", stamp_files),
  videoController: new DocumentController(videoService, "video", video_files),
  dbController: dbController,
};

module.exports = controllers;
