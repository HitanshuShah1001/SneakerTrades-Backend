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
    } else {
      return Errorhandler(
        404,
        res,
        `Request not found in user's uploaded sneakers`
      );
    }
    return res.json({
      status: `Success`,
    });
  } catch (error) {
    console.log(error, "error");
    return Errorhandler(400, res, error.message);
  }
};
