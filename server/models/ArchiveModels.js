const { model } = require("mongoose");
const schemas = require("./ArchiveSchemas");

const archiveModels = {
  //Assets Models
  audioModel: model("audios", schemas.audioSchema),
  bookModel: model("books", schemas.bookSchema),
  documentModel: model("documents", schemas.documentSchema),
  magazineModel: model("magazines", schemas.magazineSchema),
  newspaperModel: model("newspapers", schemas.newspaperSchema),
  photoModel: model("photos", schemas.photoSchema),
  photoCollectionModel: model(
    "photo_collections",
    schemas.photoCollectionSchema
  ),
  postcardModel: model("postcards", schemas.postcardSchema),
  posterModel: model("posters", schemas.posterSchema),
  stampModel: model("stamps", schemas.stampSchema),
  videoModel: model("videos", schemas.videoSchema),
  //Admin Model
  adminModel: model("admins", schemas.adminSchema),
};

module.exports = archiveModels;
