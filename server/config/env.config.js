const path = require("path");
require("dotenv/config");
require("dotenv").config({ path: path.resolve("../.env") });

//ENV Variables Configuration

const config = {
  port: process.env.DEV_PORT || 5000,
  db_connection_local: process.env.DB_CONNECTION_LOCAL,
  node_env: process.env.NODE_ENV,
  jwt_security_key: process.env.JWT_SECURITY_KEY,
  audio_files: process.env.AUDIO_FILES,
  book_files: process.env.BOOK_FILES,
  document_files: process.env.DOCUMENT_FILES,
  magazine_files: process.env.MAGAZINE_FILES,
  newspaper_files: process.env.NEWSPAPER_FILES,
  photo_collection_files: process.env.PHOTO_COLLECTION_FILES,
  postcard_files: process.env.POSTCARD_FILES,
  poster_files: process.env.POSTER_FILES,
  stamp_files: process.env.STAMP_FILES,
  video_files: process.env.VIDEO_FILES,
};

module.exports = config;
