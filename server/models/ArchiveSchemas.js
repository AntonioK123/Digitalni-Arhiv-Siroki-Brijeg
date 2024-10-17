const { Schema } = require("mongoose");

//Assets Schema
const archiveAssetsDefaultSchema = new Schema({
  naslov: { type: String, required: true },
  opis: { type: String },
  komentar: { type: String },
  datum: { type: String },
  year_range: [{ type: Number }],
  lokacija: { type: String },
  zemlja: { type: String },
  vrsta: { type: String },
  autor: { type: String },
  izdavac: { type: String },
  dimenzije: { type: String },
  format: { type: String },
  tehnika: { type: String },
  keywords: [{ type: String }],
  autorskaPrava: { type: String },
  licenca: { type: String },
  arhiv: { type: String },
  _id: { type: Number, required: true },
  postDate: { type: Date, default: Date.now },
  file: [{ type: String }],
  additionalFiles: [{ type: String }],
});

//Admin Schema
const archiveAdminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
});

const photoSch = archiveAssetsDefaultSchema;

const photoCollectionSch = new Schema({
  _id: { type: Number, required: true },
  naziv_kolekcije: { type: String, required: true },
  vlasnik_kolekcije: { type: String },
  opis: { type: String },
  datum: { type: String },
  keywords: [{ type: String }],
  photo: [photoSch],
});

const schemas = {
  //Assets
  audioSchema: archiveAssetsDefaultSchema,
  bookSchema: archiveAssetsDefaultSchema,
  documentSchema: archiveAssetsDefaultSchema,
  magazineSchema: archiveAssetsDefaultSchema,
  newspaperSchema: archiveAssetsDefaultSchema,
  photoSchema: photoSch,
  photoCollectionSchema: photoCollectionSch,
  postcardSchema: archiveAssetsDefaultSchema,
  posterSchema: archiveAssetsDefaultSchema,
  stampSchema: archiveAssetsDefaultSchema,
  videoSchema: archiveAssetsDefaultSchema,
  //Admin
  adminSchema: archiveAdminSchema,
};

module.exports = schemas;
