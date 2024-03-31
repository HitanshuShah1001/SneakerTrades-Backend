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
    const image = {
      Photo: file ? `${protocol}://${req.get("host")}/${file.path}` : ``,
    };
    const userThatUploaded = await User.findById({ _id });
    const dataToSave = {
      ...body,
      ...image,
      RequestedBy: _id,
      RequestorDetails: { Name, Email, Phone },
    };
    const sneakerRequest = await SneakerRequest.create(dataToSave);
    userThatUploaded.SneakerRequests.push(sneakerRequest);
    await userThatUploaded.save();
    Successhandler(201, res, sneakerRequest, `Sneaker Uploaded!`);
  } catch (e) {
    return console.log(e.message);
  }
};
