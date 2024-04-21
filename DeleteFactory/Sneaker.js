const Errorhandler = require("../Errorhandler/Errorhandler");
const Successhandler = require("../Succeshandler/Succeshandler");
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
      return Errorhandler(404, res, `Sneaker not found`);
    }

    const { UploadedSneakers } = userToUpdate;
    const indexOfSneakerToRemove = UploadedSneakers.indexOf(_id);

    if (indexOfSneakerToRemove !== -1) {
      UploadedSneakers.splice(indexOfSneakerToRemove, 1);
      await userToUpdate.save();
      Successhandler(204, res);
    } else {
      Errorhandler(404, res, `Sneaker not found in user's uploaded sneakers`);
    }
  } catch (error) {
    Errorhandler(400, res, error.message);
  }
};
