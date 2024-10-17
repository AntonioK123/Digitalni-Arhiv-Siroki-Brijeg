class Features {
  constructor(query, queryStr, collectionLength) {
    this.query = query;
    this.queryStr = queryStr;
    this.collectionLength = collectionLength;
  }

  filter = () => {
    const queryCopy = { ...this.queryStr };

    const removeFields = ["sort", "fields", "q", "limit", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    if (queryCopy.year) {
      this.query = this.query.find({
        year_range: { $gte: queryCopy.year, $lte: queryCopy.year },
      });
    } else {
      this.query = this.query.find(JSON.parse(queryStr));
    }
    return this;
  };

  sort = () => {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("postDate");
    }
    return this;
  };

  pagination = () => {
    const page = +this.queryStr.page || 1;
    const limit = +this.queryStr.limit || this.collectionLength;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  };
}

module.exports = Features;

//Search entire db treba pogledat dobro

// function searchAll(query,fields,sort) {
//   var all = db.getCollectionNames();
//   var results = [];
//   for (var i in all) {
//       var coll = all[i];
//       if (coll == "system.indexes") continue;
//       db[coll].find(query,fields).sort(sort).forEach(
//           function (rec) {results.push(rec);} );
//   }
//   return results;
// }
