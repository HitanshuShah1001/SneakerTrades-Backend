const SneakerRequest = require("../models/SneakerRequest");
const Succeshandler = require("../Succeshandler/Succeshandler");
const Errorhandler = require("../Errorhandler/Errorhandler");

exports.GetAllSneakerRequestsUploadedByUser = async (req, res) => {
  try {
    const {
      user: { _id },
    } = req;
    const records = await SneakerRequest.find({ RequestedBy: _id });
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
    } = req;
    console.log(id);
    const records = await SneakerRequest.find({
      RequestedBy: { $ne: id },
    });
    return Succeshandler(200, res, {
      data: records,
      count: records.length,
    });
  } catch (e) {
    return Errorhandler(500, res, e.message);
  }
};
