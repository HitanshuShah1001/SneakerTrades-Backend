const Sneaker = require("../models/Sneaker");
const { StatusSuccess } = require("../constants");
const Errorhandler = require("../Errorhandler/Errorhandler");

exports.GetAllSneakersUploadedByUser = async (req, res) => {
  try {
    const { _id: ownerId } = req.user;
    const records = await Sneaker.find({ Owner: ownerId });
    if (records.length == 0) {
      Errorhandler(404, res, `No records found!`);
    }
    res.status(200).json({
      ...StatusSuccess,
      data: records,
      count: records.length,
    });
  } catch (e) {
    Errorhandler(400, res, e.message);
  }
};

exports.GetAllSneakersNotUploadedByUser = async (req, res) => {
  try {
    const { id: ownerId } = req.body;
    const records = await Sneaker.find({
      Owner: { $ne: ownerId },
      To_Show: true,
    });
    res.status(200).json({
      ...StatusSuccess,
      data: records,
      count: records.length,
    });
  } catch (e) {
    Errorhandler(400, res, e.message);
  }
};

exports.GetSneakerByFilter = async (req, res) => {
  try {
    const { Gender, Brand, Size, Type } = req.query || {};
    // Build the filter object based on user-selected criteria
    const filter = {};

    if (Gender !== undefined) {
      filter.Gender = Gender;
    }

    if (Brand !== undefined) {
      filter.Brand = { $regex: new RegExp(Brand, "i") };
    }

    if (Size !== undefined) {
      filter.Size = Size;
    }

    if (Type !== undefined) {
      filter.Type = Type;
    }

    // Use Mongoose to search for sneakers that match the filter criteria
    const results = await Sneaker.find(filter);

    res.status(200).json({ data: results, count: results.length });
  } catch (error) {
    console.error(error);
  }
};

exports.GetSneakerBySearch = async (req, res) => {
  try {
    const query = req.query.q;
    const results = await Sneaker.find({
      $or: [
        { Name: { $regex: new RegExp(query, "i") } },
        { Brand: { $regex: new RegExp(query, "i") } },
      ],
    });
    res.status(200).json({ data: results, count: results.length });
  } catch (e) {
    Errorhandler(400, res, e.message);
  }
};

exports.GetSneakerForPurchase = async (req, res) => {
  try {
    const { _id: ownerId } = req.user;
    const results = await Sneaker.find({
      Owner: { $ne: ownerId },
      Type: "sell",
    });
    res.status(200).json({
      data: results,
      count: results.length,
    });
  } catch (e) {
    Errorhandler(400, res, e.message);
  }
};

exports.GetSneakersForBorrowing = async (req, res) => {
  try {
    const { _id: ownerId } = req.user;
    const results = await Sneaker.find({
      Owner: { $ne: ownerId },
      Type: `lend`,
    });
    res.status(200).json({
      data: results,
      count: results.length,
    });
  } catch (e) {
    Errorhandler(400, res, e.message);
  }
};
