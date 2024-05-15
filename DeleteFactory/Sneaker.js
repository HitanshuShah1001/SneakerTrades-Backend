const { SN_NOT_FOUND, STATUS_SUCCESS } = require("../Constants/constants");
const Errorhandler = require("../Errorhandler/Errorhandler");
const Sneaker = require("../models/Sneaker");
const User = require("../models/User");

exports.DeleteSneaker = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const { _id: userId } = req.user;

    const [deletedSneaker, userToUpdate] = await Promise.all([
      Sneaker.findByIdAndDelete(_id),
      User.findById(userId),
    ]);

    if (!deletedSneaker) {
      return Errorhandler(404, res, SN_NOT_FOUND);
    }

    const { UploadedSneakers } = userToUpdate;
    const indexOfSneakerToRemove = UploadedSneakers.indexOf(_id);

    if (indexOfSneakerToRemove !== -1) {
      UploadedSneakers.splice(indexOfSneakerToRemove, 1);
      await userToUpdate.save();
      return res.json({
        status: STATUS_SUCCESS,
      });
    } else {
      Errorhandler(404, res, SN_NOT_FOUND);
    }
  } catch (error) {
    Errorhandler(400, res, error.message);
  }
};
