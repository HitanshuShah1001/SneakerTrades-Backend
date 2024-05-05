const Errorhandler = require("../Errorhandler/Errorhandler");
const SneakerRequest = require("../models/SneakerRequest");
const User = require("../models/User");
const Successhandler = require("../Succeshandler/Succeshandler");

exports.CreateRequest = async (req, res) => {
  try {
    const {
      user: { _id, Name, Email, Phone },
      body,
      protocol,
      file,
    } = req;
    console.log(file);

    const userThatUploaded = await User.findById({ _id });
    if (
      userThatUploaded.TotalRequestsDone >= 10000 &&
      !userThatUploaded.IsPremium
    ) {
      return Errorhandler(
        403,
        res,
        `Upgrade to premium to upload create more requests!`
      );
    }
    const image = {
      Photo: file ? `${protocol}://${req.get("host")}/${file.path}` : ``,
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
    Successhandler(201, res, sneakerRequest, `Sneaker Uploaded!`);
  } catch (e) {
    return console.log(e.message);
  }
};
