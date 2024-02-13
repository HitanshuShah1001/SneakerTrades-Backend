const Errorhandler = require("../Errorhandler/Errorhandler");
const Succeshandler = require("../Succeshandler/Succeshandler");
const User = require("../models/User");

//@Todo - Find the corresponding sneakers for the user and delete them as well.
exports.DeleteUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const userToDelete = await User.findByIdAndDelete({ _id });
    if (!userToDelete) {
      Errorhandler(404, res, `No user found`);
    }
    Succeshandler(201, res, SneakerRecord, `User Deleted Succesfully!`);
  } catch (e) {
    Errorhandler(400, res, e.message);
  }
};
