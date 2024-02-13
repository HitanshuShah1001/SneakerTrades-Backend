const Errorhandler = require("../Errorhandler/Errorhandler");
const Succeshandler = require("../Succeshandler/Succeshandler");
const Sneaker = require("../models/Sneaker");
const User = require("../models/User");

exports.ChangeSneakerToLent = async (req, res) => {
  try {
    const { id: _id } = req.body;
    const { id: userId } = req.user;
    const [sneaker, user] = await Promise.all([
      Sneaker.findById({ _id }),
      User.findById({ _id: userId }),
    ]);
    sneaker.To_Show = false;
    sneaker.Is_Lent = true;
    user.SneakersLent.push(_id);
    await Promise.all([sneaker.save(), user.save()]);
    return Succeshandler(200, res);
  } catch (e) {
    Errorhandler(400, res, e.message);
  }
};

exports.ChangeSneakerToSold = async (req, res) => {
  try {
    const { id: _id } = req.body;
    const { id: userId } = req.user;
    const [sneaker, user] = await Promise.all([
      Sneaker.findById({ _id }),
      User.findById({ _id: userId }),
    ]);
    sneaker.To_Show = false;
    sneaker.Is_Bought = true;
    user.SneakersSold.push(_id);
    await Promise.allSettled([sneaker.save(), user.save()]);
    return Succeshandler(200, res);
  } catch (e) {
    Errorhandler(400, res, e.message);
  }
};
