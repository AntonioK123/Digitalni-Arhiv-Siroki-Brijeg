const useAsyncWrapper = require("../utils/useAsyncWrapper");
const Client_Error = require("../middlewares/errorhandling/User_Agent_Error_Class");
const createFolder = require("../middlewares/filehandling/createFolder");
const renameFolder = require("../middlewares/filehandling/renameFolder");
const rmFolder = require("../middlewares/filehandling/removeFolder");
const moveFile = require("../middlewares/filehandling/moveFile");
const { rmMultipleFiles } = require("../middlewares/filehandling/removeFile");

class CollectionController {
  constructor(service, name, filesPath) {
    this.service = service;
    this.name = name;
    this.filesPath = filesPath;
  }

  getAllCollections = useAsyncWrapper(async (req, res, next) => {
    let mutateString = this.name[0].toUpperCase() + this.name.slice(1);

    const { result } = await this.service.getAll();
 

    res.status(200).json({
      status: "OK",
      message: `Get all ${this.name} collections successfully`,
      length: result.length,
      data: result,
    });
  });

  getOneCollection = useAsyncWrapper(async (req, res, next) => {
    const { collectionId } = req.params;
    let mutateString = this.name[0].toUpperCase() + this.name.slice(1);

    const { result } = await this.service.getOne(collectionId);

    if (result === null) {
      const err = new Client_Error(
        ` ${mutateString} collection with id ${collectionId} doesn't exist`,
        404
      );
      return next(err);
    }
    res.status(200).json({
      status: "OK",
      message: `Get ${this.name} collection successfully`,
      data: result,
    });
  });

  createCollection = useAsyncWrapper(async (req, res, next) => {
    const data = req.body;
    const folder = createFolder(this.filesPath, data.naziv_kolekcije);

    const { validId, result } = await this.service.create({
      ...data,
      folder,
    });
    if (validId) {
      const err = new Client_Error(
        `The ${this.name} with ID number ${validId._id} already exists, please change the ID number`,
        400
      );
      return next(err);
    }

    res.status(201).json({
      status: "Created",
      message: `${result.naziv_kolekcije} is successfully created`,
      data: result,
    });
  });

  updateCollection = useAsyncWrapper(async (req, res, next) => {
    const { collectionId } = req.params;
    let mutateString = this.name[0].toUpperCase() + this.name.slice(1);
    const { result } = await this.service.getOne(collectionId);
    const data = req.body;

    const folder =
      result.naziv_kolekcije !== data.naziv_kolekcije
        ? renameFolder(
            this.filesPath,
            result.naziv_kolekcije,
            data.naziv_kolekcije
          )
        : null;

    const { updatedResult } = await this.service.update(collectionId, {
      ...data,
      folder,
    });

    res.status(200).json({
      status: "OK",
      message: `${mutateString} collection is successfully updated`,
      data: updatedResult,
    });
  });

  deleteCollection = useAsyncWrapper(async (req, res, next) => {
    const { collectionId } = req.params;
    const { result } = await this.service.remove(collectionId);

    rmFolder(this.filesPath, result.naziv_kolekcije);

    res.status(200).json({
      status: "OK",
      message: `${result.naziv_kolekcije} with id ${result._id} is successfully deleted from ${this.name} collections.`,
      data: null,
    });
  });

  getAllDocuments = useAsyncWrapper(async (req, res, next) => {
    const { collectionId } = req.params;

    let query = req.query;

    const url = req.originalUrl;

    const { result, getName, collectionYearRange } =
      await this.service.getDocuments(collectionId, query);

    if ((url.includes("/?") && result.length === 0) || query._id === 0) {
      const error = new Client_Error("Not found", 404);
      return next(error);
    }

    if (result.length === 0) {
      const error = new Client_Error(`${getName} is empty`, 404);
      return next(error);
    }

    res.status(200).json({
      status: "OK",
      message: `Get all ${this.name + "s"} from ${getName} successfully`,
      length: result.length,
      data: result,
      dataYearRange: collectionYearRange,
    });
  });

  getOneDocument = useAsyncWrapper(async (req, res, next) => {
    const { collectionId } = req.params;
    const { documentId } = req.params;
    let mutateString = this.name[0].toUpperCase() + this.name.slice(1);
    const { name, result } = await this.service.getDocument(
      collectionId,
      documentId
    );
    if (result === null) {
      const err = new Client_Error(
        `${mutateString} with id ${documentId} doesn't exist inside ${name.naziv_kolekcije} `,
        404
      );
      return next(err);
    }

    res.status(200).json({
      status: "OK",
      message: `Get ${this.name} with id ${documentId} from ${name.naziv_kolekcije} successfully`,
      data: result,
    });
  });

  createDocument = useAsyncWrapper(async (req, res, next) => {
    const { collectionId } = req.params;
    let mutateString = this.name[0].toUpperCase() + this.name.slice(1);
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

    const { validId, documentResult } = await this.service.createDoc(
      collectionId,
      {
        ...data,
        file,
        additionalFiles,
      }
    );

    if (validId) {
      const err = new Client_Error(
        `${mutateString} with ID number ${validId._id} already exists inside the collection, please change the ID number`,
        400
      );
      next(err);
      rmMultipleFiles(this.filesPath, file);
      return;
    }
    if (file !== undefined) {
      moveFile(
        `${this.filesPath}/${file}`,
        `${this.filesPath}/${documentResult.naziv_kolekcije}/${file}`
      );
    }

    res.status(201).json({
      status: "Created",
      message: `New ${this.name} is successfully added to ${documentResult.naziv_kolekcije}`,
      data: documentResult,
    });
  });


  updateDocument = useAsyncWrapper(async (req, res, next) => {
    const { collectionId, documentId } = req.params;
    const data = req.body;

    const { result } = await this.service.getDocument(collectionId, documentId);

    const newFileNames = req.files["file[]"]?.map((f) => f.originalname) || [];
    const newAdditionalFileNames =
      req.files["additionalFiles[]"]?.map((f) => f.originalname) || [];

    const file =
      newFileNames.length > 0 ? newFileNames : data.file || result.file || [];
    const additionalFiles =
      newAdditionalFileNames.length > 0
        ? newAdditionalFileNames
        : data.additionalFiles || result.additionalFiles || [];

    // Update data with year range
    const matchNumber = data.datum ? data.datum.match(/[0-9]+/g) : [];
    data.year_range = matchNumber ? matchNumber.map(Number) : [];

    const { updatedResult } = await this.service.updateDoc(
      collectionId,
      documentId,
      { ...data, file, additionalFiles }
    );

    // Handle file moving and cleanup logic
    await this.handleFileUpdates(
      file,
      additionalFiles,
      result,
      updatedResult,
      documentId
    );

    res.status(200).json({
      status: "OK",
      message: `The ${this.name} with id number ${documentId} is successfully updated inside ${updatedResult.naziv_kolekcije}`,
      result: updatedResult[this.name].find(
        (el) => el._id.toString() === documentId
      ),
    });
  });

  // Helper function to handle file updates
  async handleFileUpdates(
    file,
    additionalFiles,
    result,
    updatedResult,
    documentId
  ) {
    // Logic to move files and remove old files
    const newFile = updatedResult[this.name].find(
      (el) => el._id.toString() === documentId
    ).file;
    const newAdditionalFiles = updatedResult[this.name].find(
      (el) => el._id.toString() === documentId
    ).additionalFiles;

    if (JSON.stringify(newFile) !== JSON.stringify(file)) {
      // Move new file to its new location
      await moveFile(
        `${this.filesPath}/${file}`,
        `${this.filesPath}/${updatedResult.naziv_kolekcije}/${file}`
      );
      await rmMultipleFiles(
        `${this.filesPath}/${updatedResult.naziv_kolekcije}`,
        result.file
      );
    }

    if (
      JSON.stringify(newAdditionalFiles) !== JSON.stringify(additionalFiles)
    ) {
      // Move additional files
      await moveFile(
        `${this.filesPath}/${additionalFiles}`,
        `${this.filesPath}/${updatedResult.naziv_kolekcije}/${additionalFiles}`
      );
      await rmMultipleFiles(
        `${this.filesPath}/${updatedResult.naziv_kolekcije}`,
        result.additionalFiles
      );
    }
  }

  deleteDocument = useAsyncWrapper(async (req, res, next) => {
    const { collectionId } = req.params;
    const { documentId } = req.params;

    const { name } = await this.service.deleteDoc(collectionId, documentId);

    res.status(200).json({
      status: "OK",
      message: `The ${this.name} with id ${documentId} is successfully deleted from ${name.naziv_kolekcije}`,
      data: null,
    });
  });
}

module.exports = CollectionController;
