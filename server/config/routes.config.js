const audioRoute = require("../routes/audio.routes");
const bookRoute = require("../routes/book.routes");
const documentRoute = require("../routes/document.route");
const magazineRoute = require("../routes/magazine.route");
const newspaperRoute = require("../routes/newspaper.routes");
const postcardRoute = require("../routes/postcard.routes");
const posterRoute = require("../routes/poster.routes");
const stampRoute = require("../routes/stamp.routes");
const videoRoute = require("../routes/video.routes");
const authRoute = require("../routes/auth.routes");
const photoCollectionRoute = require("../routes/photo_collection.routes");
const allCollectionsRoute = require("../routes/allCollections.routes");
module.exports = {
  allCollectionsRoute,
  audioRoute,
  authRoute,
  bookRoute,
  documentRoute,
  magazineRoute,
  newspaperRoute,
  postcardRoute,
  stampRoute,
  posterRoute,
  videoRoute,
  photoCollectionRoute,
};
