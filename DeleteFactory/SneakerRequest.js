const Errorhandler = require("../Errorhandler/Errorhandler");
const Successhandler = require("../Succeshandler/Succeshandler");
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
      return Errorhandler(404, res, `Request not found`);
    }

    const { SneakerRequests } = userToUpdate;
    const indexOfSneakerToRemove = SneakerRequests.indexOf(_id);

    if (indexOfSneakerToRemove !== -1) {
      SneakerRequests.splice(indexOfSneakerToRemove, 1);
      await userToUpdate.save();
      Successhandler(204, res);
    } else {
      Errorhandler(404, res, `Request not found in user's uploaded sneakers`);
    }
  } catch (error) {
    Errorhandler(400, res, error.message);
  }
};
