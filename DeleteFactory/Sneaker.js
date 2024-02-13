const Errorhandler = require("../Errorhandler/Errorhandler");
const Successhandler = require("../Succeshandler/Succeshandler");
const Sneaker = require("../models/Sneaker");
const User = require("../models/User");

exports.DeleteSneaker = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const {
      user: { _id: userId },
    } = req;
    const [sneakerToDelete, userToModify] = await Promise.all([
      Sneaker.findByIdAndDelete({ _id: _id }),
      User.findById({ _id: userId }),
    ]);
    const indexOfSneakerToRemove = userToModify.UploadedSneakers.indexOf(_id);
    if (indexOfSneakerToRemove !== -1) {
      userToModify.UploadedSneakers.splice(indexOfSneakerToRemove, 1);
      await userToModify.save();
      Successhandler(201, res);
    } else {
      Errorhandler(400, res, `Sneaker not found`);
    }
  } catch (e) {
    Errorhandler(400, res, e.message);
  }
};
