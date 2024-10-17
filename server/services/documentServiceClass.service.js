const { rmMultipleFiles } = require("../middlewares/filehandling/removeFile");
const Features = require("../utils/features");

class DocumentService {
  constructor(model, filesPath) {
    this.model = model;
    this.filesPath = filesPath;
  }

  create = async ({ ...obj }) => {
    const { _id } = obj;
    const idExists = await this.model.findOne({ _id: _id });
    if (idExists) {
      return { validId: idExists };
    } else {
      const createData = await this.model.create({
        ...obj,
      });

      return { result: createData };
    }
  };

  getAll = async (query) => {
    const getAllDocsLength = await this.model.find({});

    const features = new Features(
      this.model.find(),
      query,
      getAllDocsLength.length
    )
      .filter()
      .sort()
      .pagination();

    let getData = await features.query;

    //Get year_ranges from all documents inside the collection
    let flatArray = getData
      .map((x) => {
        return x.year_range;
      })
      .flat();

    //Remove duplicate numbers and sort by ascending order
    let sortedArrayOfYears = flatArray
      .filter((v, i) => flatArray.indexOf(v) === i)
      .sort((a, b) => {
        return a - b;
      });

    //The array of two values with oldest and youngest year inside the collection of the documents
    let yearRange = [
      sortedArrayOfYears[0],
      sortedArrayOfYears[sortedArrayOfYears.length - 1],
    ];

    return { result: getData, collectionYearRange: yearRange };
  };

  getOne = async (id) => {
    const getData = await this.model.findById(id);
    return { result: getData };
  };

  update = async (id, { ...obj }) => {
    const updatedData = await this.model.findByIdAndUpdate(
      id,
      { ...obj },
      { new: true, runValidators: true }
    );
    return { updatedResult: updatedData };
  };

  remove = async (id) => {
    const rmData = await this.model.findByIdAndDelete(id);
    rmMultipleFiles(this.filesPath, rmData.file);
    rmMultipleFiles(this.filesPath, rmData.additionalFiles);

    return { result: rmData };
  };
}

module.exports = DocumentService;
