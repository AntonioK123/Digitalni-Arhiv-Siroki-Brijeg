const services = require("../services/services");
const useAsyncWrapper = require("../utils/useAsyncWrapper");
const Client_Error = require("../middlewares/errorhandling/User_Agent_Error_Class");

const getAllCollections = useAsyncWrapper(async (req, res) => {
  let arr = [];
  let dbYearRange = [];
  const query = req.query;
  const url = req.originalUrl;
  const audioResult = await services.audioService.getAll(query);
  const bookResult = await services.bookService.getAll(query);
  const documentResult = await services.documentService.getAll(query);
  const magazineResult = await services.magazineService.getAll(query);
  const newspaperResult = await services.newspaperService.getAll(query);
  const photoCollectionResult = await services.photoCollectionService.getAll();
  const postcardResult = await services.postcardService.getAll(query);
  const posterResult = await services.posterService.getAll(query);
  const stampResult = await services.stampService.getAll(query);
  const videoResult = await services.videoService.getAll(query);
  let arrCopy = [
    { audioCollection: audioResult.result },
    { bookCollection: bookResult.result },
    { documentCollection: documentResult.result },
    { magazineCollection: magazineResult.result },
    { newspaperCollection: newspaperResult.result },
    { photoCollection: photoCollectionResult.result },
    { postcardCollection: postcardResult.result },
    { posterCollection: posterResult.result },
    { stampCollection: stampResult.result },
    { videoCollection: videoResult.result },
  ];
  let dbYearRangeCopy = [
    audioResult.collectionYearRange,
    bookResult.collectionYearRange,
    documentResult.collectionYearRange,
    magazineResult.collectionYearRange,
    newspaperResult.collectionYearRange,
    postcardResult.collectionYearRange,
    posterResult.collectionYearRange,
    stampResult.collectionYearRange,
    videoResult.collectionYearRange,
  ];
  arr.push(...arrCopy);
  dbYearRange.push(...dbYearRangeCopy);
  let t = dbYearRange.flat();
  let sortedArrayOfYears = t
    .filter((v, i) => t.indexOf(v) === i)
    .sort((a, b) => {
      return a - b;
    })
    .filter(Number);

  let yearRange = [
    sortedArrayOfYears[0],
    sortedArrayOfYears[sortedArrayOfYears.length - 1],
  ];

  if (url.includes("/?") && arr.length === 0) {
    const error = new Client_Error("Not found", 404);
    return next(error);
  }

  if (arr.length === 0) {
    const error = new Client_Error("Database is empty", 404);
    return next(error);
  }

  res.status(200).json({
    status: "OK",
    message: "Get all data successfully",
    length: arr.length,
    databaseYearRange: yearRange,
    result: arr,
  });
});

module.exports = getAllCollections;
