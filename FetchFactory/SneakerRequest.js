const SneakerRequest = require("../models/SneakerRequest");
const Succeshandler = require("../Succeshandler/Succeshandler");
const Errorhandler = require("../Errorhandler/Errorhandler");

exports.GetAllSneakerRequestsUploadedByUser = async (req, res) => {
  try {
    const {
      user: { _id },
      pagination: { limit, skip },
    } = req;
    const records = await SneakerRequest.find({ RequestedBy: _id })
      .limit(limit)
      .skip(skip);
    if (records.length == 0) {
      return Errorhandler(404, res, `No records found!`);
    }
    return Succeshandler(200, res, {
      data: records,
      count: records.length,
    });
  } catch (e) {
    return Errorhandler(500, res, e.message);
  }
};

exports.GetSneakerRequests = async (req, res) => {
  try {
    const {
      searchQuery,
      filters,
      pagination: { limit, skip },
    } = req.body;

    const filter = {};

    if (filters) {
      if (filters.Gender && filters.Gender.length > 0) {
        filter.Gender = { $in: filters.Gender };
      }

      if (filters.Brand && filters.Brand.length > 0) {
        filter.Brand = {
          $in: filters.Brand.map((brand) => new RegExp(brand, "i")),
        };
      }

      if (filters.Size && filters.Size.length > 0) {
        filter.Size = { $in: filters.Size };
      }
    }
    let query = {};
    if (searchQuery) {
      query = {
        $or: [
          { Name: { $regex: new RegExp(searchQuery, "i") } },
          { Brand: { $regex: new RegExp(searchQuery, "i") } },
        ],
      };
    }

    const combinedQuery = { ...query, ...filter };

    const results = await SneakerRequest.find(combinedQuery)
      .limit(limit)
      .skip(skip);

    return Succeshandler(200, res, {
      data: results,
      count: results.length,
    });
  } catch (error) {
    return Errorhandler(500, res, error.message);
  }
};
