const Errorhandler = require("../Errorhandler/Errorhandler");
const Successhandler = require("../Succeshandler/Succeshandler");
const Sneaker = require("../models/Sneaker");
const User = require("../models/User");

exports.UploadSneaker = async (req, res) => {
  try {
    const {
      files,
      protocol,
      user: { _id: userId },
      body: { Type, ...sneakerDetails },
    } = req;
    const userToSaveDetailsFor = await User.findById(userId);
    const Photos = files.map(
      (file) => `${protocol}://${req.get("host")}/uploads/${file.filename}`
    );

    const SneakerRecord = await Sneaker.create({
      ...sneakerDetails,
      Photos,
      Owner: userId,
      Type,
    });

    const { _id } = SneakerRecord;

    userToSaveDetailsFor.UploadedSneakers.push(_id);
    if (Type === `lend`) {
      userToSaveDetailsFor.SneakersToBeLent.push(_id);
    } else if (Type === `sell`) {
      userToSaveDetailsFor.SneakersToBeSold.push(_id);
    } else {
      userToSaveDetailsFor.SneakersToBeLent.push(_id);
      userToSaveDetailsFor.SneakersToBeSold.push(_id);
    }

    await userToSaveDetailsFor.save();

    Successhandler(201, res, SneakerRecord, `Sneaker Uploaded!`);
  } catch (error) {
    Errorhandler(400, res, error.message);
  }
};