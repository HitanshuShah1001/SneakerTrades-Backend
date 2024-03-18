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

exports.GetAllSneakerRequestsNotDoneByUser = async (req, res) => {
  try {
    const {
      user: { id },
      pagination: { limit, skip },
    } = req;

    const records = await SneakerRequest.find({
      RequestedBy: { $ne: id },
    })
      .limit(limit)
      .skip(skip);
    return Succeshandler(200, res, {
      data: records,
      count: records.length,
    });
  } catch (e) {
    return Errorhandler(500, res, e.message);
  }
};
