const Errorhandler = require("../Errorhandler/Errorhandler");
const User = require("../models/User");
const Sneaker = require("../models/Sneaker");
const SneakerRequest = require("../models/SneakerRequest");
const { NO_USER_FOUND, STATUS_SUCCESS } = require("../Constants/constants");

//@Todo - Find the corresponding sneakers for the user and delete them as well.
exports.DeleteUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const [userToDelete, ,] = await Promise.all([
      User.findByIdAndDelete({ _id }),
      Sneaker.deleteMany({ Owner: _id }),
      SneakerRequest.deleteMany({ RequestedBy: _id }),
    ]);
    if (!userToDelete) {
      Errorhandler(404, res, NO_USER_FOUND);
    }
    return res.json({
      status: STATUS_SUCCESS,
    });
  } catch (e) {
    Errorhandler(400, res, e.message);
  }
};
