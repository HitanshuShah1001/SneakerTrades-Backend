const Errorhandler = require("../Errorhandler/Errorhandler");
const Successhandler = require("../Succeshandler/Succeshandler");
const Sneaker = require("../models/Sneaker");
const User = require("../models/User");

exports.UploadSneaker = async (req, res) => {
  try {
    const {
      files,
      user: { _id: userId, Name, Phone, Email },
      body: { Type, ...sneakerDetails },
    } = req;
    const userToSaveDetailsFor = await User.findById(userId);
    if (
      userToSaveDetailsFor.TotalSneakersUploaded >= 3 &&
      !userToSaveDetailsFor.IsPremium
    ) {
      return Errorhandler(
        403,
        res,
        `Upgrade to premium to upload more sneakers!`
      );
    }
    const Photos = files.map((file) => file.location);
    const SneakerRecord = await Sneaker.create({
      ...sneakerDetails,
      Photos,
      Owner: userId,
      OwnerDetails: {
        Name,
        Email,
        Phone,
      },
      Type,
    });
    const { _id } = SneakerRecord;
    userToSaveDetailsFor.UploadedSneakers.push(_id);
    userToSaveDetailsFor.TotalSneakersUploaded += 1;
    await userToSaveDetailsFor.save();

    Successhandler(201, res, SneakerRecord, `Sneaker Uploaded!`);
  } catch (error) {
    Errorhandler(400, res, error.message);
  }
};
