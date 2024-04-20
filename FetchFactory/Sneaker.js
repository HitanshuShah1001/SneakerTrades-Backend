const Sneaker = require("../models/Sneaker");
const Errorhandler = require("../Errorhandler/Errorhandler");
const Succeshandler = require("../Succeshandler/Succeshandler");

exports.GetAllSneakersUploadedByUser = async (req, res) => {
  try {
    const {
      user: { _id: ownerId },
    } = req;
    const records = await Sneaker.find({ Owner: ownerId });

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

exports.GetSneakers = async (req, res) => {
  try {
    const { searchQuery, filters } = req.body;
    const {
      user: { _id: id },
    } = req;
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
    const combinedQuery = { ...query, ...filter, Owner: { $ne: id } };
    const results = await Sneaker.find(combinedQuery);
    return Succeshandler(200, res, {
      data: results,
      count: results.length,
    });
  } catch (error) {
    return Errorhandler(500, res, error.message);
  }
};
