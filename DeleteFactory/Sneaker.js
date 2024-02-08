const Sneaker = require("../models/Sneaker");
const User = require("../models/User");

exports.DeleteSneaker = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const {
      user: { _id: userId },
    } = req;
    console.log(userId, _id);
    const [sneakerToDelete, userToModify] = await Promise.all([
      Sneaker.findByIdAndDelete({ _id: _id }),
      User.findById({ _id: userId }),
    ]);
    const indexOfSneakerToRemove = userToModify.UploadedSneakers.indexOf(_id);
    if (indexOfSneakerToRemove !== -1) {
      userToModify.UploadedSneakers.splice(indexOfSneakerToRemove, 1);
    }
    await userToModify.save();
    res.status(201).json({
      status: `Success`,
    });
  } catch (e) {
    console.log(e, "Error occured in sneaker delte");
  }
};
