const Errorhandler = require("../Errorhandler/Errorhandler");
const Succeshandler = require("../Succeshandler/Succeshandler");
const Sneaker = require("../models/Sneaker");

exports.HideSneaker = async (req, res) => {
  try {
    const {
      params: { id: _id },
    } = req;
    const sneakerToHide = await Sneaker.findById({ _id });
    sneakerToHide.To_Show = false;
    await sneakerToHide.save();
    return Succeshandler(200, res, undefined, `Sneaker Hidden Succesfully`);
  } catch (e) {
    return Errorhandler(500, res, e.message);
  }
};
