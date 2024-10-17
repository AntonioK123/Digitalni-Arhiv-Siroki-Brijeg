const { rmSingleFile } = require("../middlewares/filehandling/removeFile");
const Features = require("../utils/features");
class CollectionService {
  constructor(model, documentName, filesPath) {
    this.model = model;
    this.documentName = documentName;
    this.filesPath = filesPath;
  }

  create = async ({ ...obj }) => {
    const { _id } = obj;
    const idExists = await this.model.findOne({ _id: _id });
    if (idExists) {
      return { validId: idExists };
    } else {
      const createData = await this.model.create({ ...obj });

      return { result: createData };
    }
  };

  getAll = async () => {
    const getData = await this.model.find({});
    return { result: getData };
  };

  getOne = async (collectionId) => {
    const getData = await this.model.findById(collectionId);
    return { result: getData };
  };

  update = async (collectionId, { ...obj }) => {
    const updatedData = await this.model.findByIdAndUpdate(
      collectionId,
      { ...obj },
      { new: true, runValidators: true }
    );
    return { updatedResult: updatedData };
  };

  remove = async (collectionId) => {
    const rmData = await this.model.findByIdAndDelete(collectionId);
    return { result: rmData };
  };

  getDocuments = async (collectionId, query) => {
    const getData = await this.model.find({ _id: collectionId });

    const getArrayOfEmbeddedDocs = getData
      .map((p) => {
        return p[`${this.documentName}`];
      })
      .flat();

    let filteredData = getArrayOfEmbeddedDocs;
    filteredData = filteredData.sort((a, b) => a._id - b._id);
    if (query.hasOwnProperty("_id")) {
      query._id = +query._id;
      filteredData = filteredData.filter((x) => {
        return query._id ? x._id === query._id : [];
      });
    }
    if (query.hasOwnProperty("year")) {
      query.year = +query.year;
      filteredData = filteredData.filter((x) => {
        return query.year
          ? query.year >= x.year_range[0] &&
              query.year <= x.year_range[x.year_range.length - 1]
          : [];
      });
    }

    if (query.hasOwnProperty("sort")) {
      if (query.sort === "-_id") {
        filteredData = filteredData.sort((a, b) => b._id - a._id);
      } else if (query.sort === "naslov") {
        filteredData = filteredData.sort((a, b) =>
          a.naslov.localeCompare(b.naslov)
        );
      } else if (query.sort === "-naslov") {
        filteredData = filteredData.sort((a, b) =>
          b.naslov.localeCompare(a.naslov)
        );
      } else if (query.sort === "postDate") {
        filteredData = filteredData.sort((a, b) => a.postDate - b.postDate);
      } else if (query.sort === "-postDate") {
        filteredData = filteredData.sort((a, b) => b.postDate - a.postDate);
      } else {
        filteredData = filteredData.sort((a, b) => a._id - b._id);
      }
    }

    //Get year_ranges from all documents inside the collection and transform the matrix into the array
    let flatArray = getArrayOfEmbeddedDocs
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

    return {
      result: filteredData,
      getName: getData[0].naziv_kolekcije,
      collectionYearRange: yearRange,
    };
  };

  getDocument = async (collectionId, documentId) => {
    const getName = await this.model.findById(collectionId);
    const getData = await this.model
      .findById(collectionId)
      .select(`${this.documentName}`)
      .then((p) => {
        return p[`${this.documentName}`].id(documentId);
      });
    return { result: getData, name: getName };
  };

  createDoc = async (collectionId, { ...obj }) => {
    const { _id } = obj;
    const idExists = await this.model
      .findById(collectionId)
      .select(`${this.documentName}`)
      .then((p) => {
        return p[`${this.documentName}`].id(_id);
      });
    if (idExists) {
      return { validId: idExists };
    } else {
      const createData = await this.model.findByIdAndUpdate(
        collectionId,
        {
          $push: { [`${this.documentName}`]: { ...obj } },
        },
        { new: true, runValidators: true }
      );

      return { documentResult: createData };
    }
  };

  updateDoc = async (collectionId, documentId, { ...obj }) => {
    const {
      naslov,
      opis,
      komentar,
      datum,
      year_range,
      lokacija,
      zemlja,
      vrsta,
      autor,
      izdavac,
      dimenzije,
      format,
      tehnika,
      keywords,
      autorskaPrava,
      licenca,
      arhiv,
      file,
      additionalFiles,
    } = obj;
    const updateData = await this.model.findOneAndUpdate(
      {
        _id: collectionId,
        [`${this.documentName}._id`]: documentId,
      },
      {
        $set: {
          [`${this.documentName}.$.naslov`]: naslov,
          [`${this.documentName}.$.opis`]: opis,
          [`${this.documentName}.$.komentar`]: komentar,
          [`${this.documentName}.$.datum`]: datum,
          [`${this.documentName}.$.year_range`]: year_range,
          [`${this.documentName}.$.lokacija`]: lokacija,
          [`${this.documentName}.$.zemlja`]: zemlja,
          [`${this.documentName}.$.vrsta`]: vrsta,
          [`${this.documentName}.$.autor`]: autor,
          [`${this.documentName}.$.izdavac`]: izdavac,
          [`${this.documentName}.$.dimenzije`]: dimenzije,
          [`${this.documentName}.$.format`]: format,
          [`${this.documentName}.$.tehnika`]: tehnika,
          [`${this.documentName}.$.keywords`]: keywords,
          [`${this.documentName}.$.autorskaPrava`]: autorskaPrava,
          [`${this.documentName}.$.licenca`]: licenca,
          [`${this.documentName}.$.arhiv`]: arhiv,
          [`${this.documentName}.$.file`]: file,
          [`${this.documentName}.$.additionalFiles`]: additionalFiles,
        },
      },
      { new: true, runValidators: true }
    );

    return { updatedResult: updateData };
  };

  deleteDoc = async (collectionId, documentId) => {
    const getName = await this.model
      .findById(collectionId)
      .select([`${this.documentName}`, "naziv_kolekcije"]);

    await this.model
      .findById(collectionId)
      .select(`${this.documentName}`)
      .then((p) => {
        if (
          p[`${this.documentName}`].id(documentId).file.toString() !==
          [].toString()
        ) {
          rmSingleFile(
            `${this.filesPath}/${getName.naziv_kolekcije}`,
            `/${p[`${this.documentName}`].id(documentId).file}`
          );
        }
        p[`${this.documentName}`].pull({ _id: documentId });
        p.save();
      });
    return { name: getName };
  };
}

module.exports = CollectionService;
