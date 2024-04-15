const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserUtil = require("../Utils/User");
const Errorhandler = require("../Errorhandler/Errorhandler");
require("dotenv").config();

exports.SignUp = async (req, res) => {
  try {
    const image = {
      ProfilePhoto: req.file
        ? `${req.protocol}://${req.get("host")}/${req.file.path}`
        : ``,
    };
    const data = { ...req.body, ...image };
    const user = await User.create(data);
    UserUtil.createToken(user, 201, res);
  } catch (e) {
    Errorhandler(400, res, e);
  }
};
