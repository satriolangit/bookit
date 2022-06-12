class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const location = this.queryStr.location
      ? {
          address: {
            $regex: this.queryStr.location,
            $options: "i",
          },
        }
      : {};

    console.log(location);

    this.query = this.query.find({ ...location });
    return this;
  }

  filter() {
    const queryTemp = { ...this.queryStr };

    //remove fields from query
    const removeFields = ["location", "page"];
    removeFields.forEach((el) => delete queryTemp[el]);

    this.query = this.query.find(queryTemp);
    return this;
  }

  pagination(itemsPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = itemsPerPage * (currentPage - 1);

    this.query = this.query.limit(itemsPerPage).skip(skip);

    return this;
  }
}

export default APIFeatures;
