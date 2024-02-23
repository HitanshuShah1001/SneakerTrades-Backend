const Errorhandler = require("../Errorhandler/Errorhandler");
const Succeshandler = require("../Succeshandler/Succeshandler");
const Sneaker = require("../models/Sneaker");
const SneakerRequest = require("../models/SneakerRequest");
const User = require("../models/User");
require("dotenv").config();

exports.DeleteEverything = async (req, res) => {
  try {
    const {
      body: { secret },
    } = req;
    if (secret !== process.env.ARMSECRET) {
      return Errorhandler(401, res, `Not authorised!`);
    }
    const [sneakerDelete, sneakerRequestsDelete, userDelete] =
      await Promise.allSettled([
        Sneaker.deleteMany(),
        SneakerRequest.deleteMany(),
        User.deleteMany(),
      ]);
    return Succeshandler(204, res);
  } catch (e) {
    return Errorhandler(400, res, e.message);
  }
};
