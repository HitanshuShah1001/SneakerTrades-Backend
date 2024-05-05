const Errorhandler = require("../Errorhandler/Errorhandler");
const Succeshandler = require("../Succeshandler/Succeshandler");
const User = require("../models/User");

exports.UpdateUser = async (req, res) => {
  try {
    const { _id: id, ProfilePhoto } = req.user || {};
    const image = {
      ProfilePhoto: req.file ? req.file.location : ProfilePhoto,
    };
    const data = { ...req.body, ...image };
    const user = await User.findByIdAndUpdate(id, data, {
      new: true,
    });
    return Succeshandler(200, res, user, `User updated succesfully`);
  } catch (e) {
    Errorhandler(400, res, e);
  }
};
