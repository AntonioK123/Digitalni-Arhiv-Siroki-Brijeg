const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const routes = require("./routes.config");
const {
  url_not_found_error,
} = require("../middlewares/errorhandling/errorFunctions");
const errorHandler = require("../middlewares/errorhandling/errorHandler");

//Cors
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//JSON Parser
app.use(express.json());

//Cookie Parser
app.use(cookieParser());
//Helemt
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//Static files
app.use(express.static("static_assets"));

//Routes Start-------------
app.use("/auth", routes.authRoute);
app.use("/all_data", routes.allCollectionsRoute);
app.use("/audio", routes.audioRoute);
app.use("/books", routes.bookRoute);
app.use("/documents", routes.documentRoute);
app.use("/magazines", routes.magazineRoute);
app.use("/newspapers", routes.newspaperRoute);
app.use("/postcards", routes.postcardRoute);
app.use("/posters", routes.posterRoute);
app.use("/stamps", routes.stampRoute);
app.use("/video", routes.videoRoute);
app.use("/photo_collections", routes.photoCollectionRoute);
app.all("*", url_not_found_error);
//Routes End-------------

app.use(errorHandler);

module.exports = app;
