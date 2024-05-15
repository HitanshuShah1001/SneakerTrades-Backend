const {
  SNEAKER_UPLOADED,
  SOME_ERROR_OCCURED,
} = require("../Constants/constants");
const Errorhandler = require("../Errorhandler/Errorhandler");
const SneakerRequest = require("../models/SneakerRequest");
const User = require("../models/User");
const Successhandler = require("../Succeshandler/Succeshandler");

exports.CreateRequest = async (req, res) => {
  try {
    const {
      user: { _id, Name, Email, Phone },
      body,
      file,
    } = req;

    const userThatUploaded = await User.findById({ _id });
    const image = {
      Photo: file ? file.location : ``,
    };

    const dataToSave = {
      ...body,
      ...image,
      RequestedBy: _id,
      RequestorDetails: { Name, Email, Phone },
    };
    const sneakerRequest = await SneakerRequest.create(dataToSave);
    userThatUploaded.SneakerRequests.push(sneakerRequest);
    userThatUploaded.TotalRequestsDone += 1;
    await userThatUploaded.save();
    Successhandler(201, res, sneakerRequest, SNEAKER_UPLOADED);
  } catch (e) {
    return Errorhandler(500, res, SOME_ERROR_OCCURED);
  }
};
