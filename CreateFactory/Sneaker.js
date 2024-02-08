const Sneaker = require("../models/Sneaker");
const User = require("../models/User");

exports.UploadSneaker = async (req, res) => {
  try {
    const {
      user,
      files,
      protocol,
      user: { _id: userId },
      body: { Type },
    } = req;
    const userToSaveDetailsFor = await User.findById(userId);
    const Photos = files.map(
      (file) => `${protocol}://${req.get("host")}/uploads/${file.filename}`
    );
    const SneakerRecord = await Sneaker.create({
      ...req.body,
      Photos,
      Owner: req.user._id,
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
    res
      .status(200)
      .json({ status: `Success`, message: `Sneaker Uploaded!`, SneakerRecord });
  } catch (e) {
    console.log(e, `Error occured`);
  }
};
