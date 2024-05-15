const { REQ_NOT_FOUND, STATUS_SUCCESS } = require("../Constants/constants");
const Errorhandler = require("../Errorhandler/Errorhandler");
const SneakerRequest = require("../models/SneakerRequest");
const User = require("../models/User");

exports.DeleteSneakerRequest = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const { _id: userId } = req.user;
    const [deletedSneakerRequest, userToUpdate] = await Promise.all([
      SneakerRequest.findByIdAndDelete(_id),
      User.findById(userId),
    ]);

    if (!deletedSneakerRequest) {
      return Errorhandler(404, res, REQ_NOT_FOUND);
    }

    const { SneakerRequests } = userToUpdate;
    const indexOfSneakerToRemove = SneakerRequests.indexOf(_id);

    if (indexOfSneakerToRemove !== -1) {
      SneakerRequests.splice(indexOfSneakerToRemove, 1);
      await userToUpdate.save();
    } else {
      return Errorhandler(404, res, REQ_NOT_FOUND);
    }
    return res.json({
      status: STATUS_SUCCESS,
    });
  } catch (error) {
    return Errorhandler(400, res, error.message);
  }
};
