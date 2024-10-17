const useAsyncWrapper = require("../utils/useAsyncWrapper");
const Client_Error = require("../middlewares/errorhandling/User_Agent_Error_Class");
const { rmMultipleFiles } = require("../middlewares/filehandling/removeFile");

class DocumentController {
  constructor(service, name, filesPath) {
    this.service = service;
    this.name = name;
    this.filesPath = filesPath;
  }
  getAllDocuments = useAsyncWrapper(async (req, res, next) => {
    let mutateString = this.name[0].toUpperCase() + this.name.slice(1);
    let query = req.query;

    const url = req.originalUrl;

    const { result, collectionYearRange } = await this.service.getAll(query);

    if (url.includes("/?") && result.length === 0) {
      const error = new Client_Error("Not found", 404);
      return next(error);
    }

    res.status(200).json({
      status: "OK",
      message: `Get all ${this.name + "s"} successfully`,
      length: result.length,
      data: result,
      [`${this.name}_collection_range`]: collectionYearRange,
    });
  });

  getOneDocument = useAsyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { result } = await this.service.getOne(id);
    let mutateString = this.name[0].toUpperCase() + this.name.slice(1);
    if (result === null) {
      const err = new Client_Error(
        ` ${mutateString} with id ${id} doesn't exist`,
        404
      );
      return next(err);
    }
    res.status(200).json({
      status: "OK",
      message: `Get ${this.name} successfully`,
      data: result,
    });
  });

  createDocument = useAsyncWrapper(async (req, res, next) => {
    const data = req.body;

    const file = req.files["file[]"]?.map((f) => {
      return f.originalname;
    });

    const additionalFiles = req.files["additionalFiles[]"]?.map((f) => {
      return f.originalname;
    });

    let matchNumber = data.datum ? data.datum.match(/[0-9]+/g) : [];

    let dataRange =
      data.datum && matchNumber !== null ? matchNumber.map(Number) : [];
    data.year_range = dataRange;

    const { validId, result } = await this.service.create({
      ...data,
      file,
      additionalFiles,
    });
    if (validId) {
      const err = new Client_Error(
        `The ${this.name} with ID number ${validId._id} already exists, please change the ID number`,
        400
      );
      next(err);
      rmMultipleFiles(this.filesPath, file);
      return;
    }

    res.status(201).json({
      status: "Created",
      message: `The ${this.name} is successfully created`,
      data: result,
    });
  });

  updateDocument = useAsyncWrapper(async (req, res) => {
    const { id } = req.params;
    const { result } = await this.service.getOne(id);
    const data = req.body;

    const newFileNames = req.files["file[]"]?.map((f) => f.originalname) || [];
    const newAdditionalFileNames =
      req.files["additionalFiles[]"]?.map((f) => f.originalname) || [];
    const file =
      newFileNames.length > 0 ? newFileNames : data.file || result.file || [];
    const additionalFiles =
      newAdditionalFileNames.length > 0
        ? newAdditionalFileNames
        : data.additionalFiles || result.additionalFiles || [];

    let matchNumber = data.datum ? data.datum.match(/[0-9]+/g) : [];

    let dataRange =
      data.datum && matchNumber !== null ? matchNumber.map(Number) : [];
    data.year_range = dataRange;

    const { updatedResult } = await this.service.update(id, {
      ...data,
      file,
      additionalFiles,
    });

    if (result.file.toString() !== updatedResult.file.toString()) {
      rmMultipleFiles(this.filesPath, result.file);
    }

    if (
      result.additionalFiles.toString() !==
      updatedResult.additionalFiles.toString()
    ) {
      rmMultipleFiles(this.filesPath, result.additionalFiles);
    }

    res.status(200).json({
      status: "OK",
      message: `The ${this.name} is successfully updated`,
      data: updatedResult,
    });
  });

  deleteDocument = useAsyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { result } = await this.service.remove(id);

    res.status(200).json({
      status: "OK",
      message: `The ${this.name} with id ${result._id} is successfully deleted`,
      data: null,
    });
  });
}

module.exports = DocumentController;
