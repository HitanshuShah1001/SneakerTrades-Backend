const SneakerRequest = require("../models/SneakerRequest");
const User = require("../models/User");
exports.CreateRequest = async (req, res) => {
  try {
    const {
      user: { _id },
      body,
    } = req;
    const image = {
      Photo: req.file
        ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        : ``,
    };
    const userThatUploaded = await User.findById({ _id });
    const dataToSave = { ...body, ...image, RequestedBy: _id };
    const sneakerRequest = await SneakerRequest.create(dataToSave);
    userThatUploaded.SneakerRequests.push(sneakerRequest);
    await userThatUploaded.save();
    res.status(200).json({
      status: `Success`,
      data: sneakerRequest,
    });
  } catch (e) {
    return Errorhandler(500, res, e.message);
  }
};
