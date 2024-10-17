const DocumentService = require("./documentServiceClass.service");
const CollectionService = require("./collectionServiceClass.service");
const {
  postcardModel,
  stampModel,
  posterModel,
  audioModel,
  bookModel,
  documentModel,
  magazineModel,
  newspaperModel,
  photoCollectionModel,
  videoModel,
} = require("../models/ArchiveModels");
const {
  audio_files,
  postcard_files,
  stamp_files,
  photo_collection_files,
  poster_files,
  book_files,
  document_files,
  magazine_files,
  newspaper_files,
  video_files,
} = require("../config/env.config");

const services = {
  audioService: new DocumentService(audioModel, audio_files),
  bookService: new DocumentService(bookModel, book_files),
  documentService: new DocumentService(documentModel, document_files),
  magazineService: new DocumentService(magazineModel, magazine_files),
  newspaperService: new DocumentService(newspaperModel, newspaper_files),
  photoCollectionService: new CollectionService(
    photoCollectionModel,
    "photo",
    photo_collection_files
  ),
  postcardService: new DocumentService(postcardModel, postcard_files),
  posterService: new DocumentService(posterModel, poster_files),
  stampService: new DocumentService(stampModel, stamp_files),
  videoService: new DocumentService(videoModel, video_files),
};

module.exports = services;
