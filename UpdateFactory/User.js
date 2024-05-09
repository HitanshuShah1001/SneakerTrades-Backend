const bcrypt = require("bcryptjs");
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

exports.ResetPassword = async (req, res) => {
  try {
    const {
      body: { Password, Email },
    } = req;
    const user = await User.findOne({
      Email: { $regex: new RegExp("^" + Email + "$", "i") },
    });
    if (!user) {
      return Errorhandler(404, res, "User not found");
    }
    let encryptedPassword = await bcrypt.hash(Password, 1);
    user.Password = encryptedPassword;
    await user.save();
    return Succeshandler(200, res, user, "Password reset succesfully");
  } catch (e) {
    console.log(e);
    // Handle any errors
    return Errorhandler(500, res, "Internal server error");
  }
};
