const Sneaker = require("../models/Sneaker");
const Errorhandler = require("../Errorhandler/Errorhandler");
const Succeshandler = require("../Succeshandler/Succeshandler");

exports.GetAllSneakersUploadedByUser = async (req, res) => {
  try {
    const {
      user: { _id: ownerId },
      pagination: { limit, skip },
    } = req;
    const records = await Sneaker.find({ Owner: ownerId })
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

exports.GetAllSneakersNotUploadedByUser = async (req, res) => {
  try {
    const {
      user: { id },
      pagination: { limit, skip },
    } = req;
    const records = await Sneaker.find({
      Owner: { $ne: id },
      To_Show: true,
    })
      .limit(limit * 1)
      .skip(skip);

    return Succeshandler(200, res, {
      data: records,
      count: records.length,
    });
  } catch (e) {
    return Errorhandler(500, res, e.message);
  }
};

exports.GetSneakerByFilter = async (req, res) => {
  try {
    const {
      Gender,
      Brand,
      Size,
      Type,
      pagination: { limit, skip },
    } = req.query || {};
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
    const results = await Sneaker.find(filter).limit(limit).skip(skip);

    return Succeshandler(200, res, {
      data: results,
      count: results.length,
    });
  } catch (error) {
    return Errorhandler(500, res, error.message);
  }
};

exports.GetSneakerBySearch = async (req, res) => {
  try {
    const {
      query,
      pagination: { skip, limit },
    } = req;

    const results = await Sneaker.find({
      $or: [
        { Name: { $regex: new RegExp(query.q, "i") } },
        { Brand: { $regex: new RegExp(query.q, "i") } },
      ],
    })
      .limit(limit)
      .skip(skip);
    return Succeshandler(200, res, {
      data: results,
      count: results.length,
    });
  } catch (e) {
    console.log(req.query);
    return Errorhandler(500, res, e.message);
  }
};

exports.GetSneakerForPurchase = async (req, res) => {
  try {
    const {
      user: { _id: ownerId },
      pagination: { skip, limit },
    } = req;
    const results = await Sneaker.find({
      Owner: { $ne: ownerId },
      Type: "sell",
    })
      .limit(limit)
      .skip(skip);
    return Succeshandler(200, res, {
      data: results,
      count: results.length,
    });
  } catch (e) {
    return Errorhandler(500, res, e.message);
  }
};

exports.GetSneakersForBorrowing = async (req, res) => {
  try {
    const {
      user: { _id: ownerId },
      pagination: { skip, limit },
    } = req;
    const results = await Sneaker.find({
      Owner: { $ne: ownerId },
      Type: `lend`,
    })
      .limit(limit)
      .skip(skip);
    return Succeshandler(200, res, {
      data: results,
      count: results.length,
    });
  } catch (e) {
    return Errorhandler(500, res, e.message);
  }
};
