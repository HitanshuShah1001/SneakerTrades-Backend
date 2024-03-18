const jwt = require("jsonwebtoken");
const Errorhandler = require("../Errorhandler/Errorhandler");
require("dotenv").config();

exports.signInToken = (id) =>
  jwt.sign({ id }, process.env.SECRET, { expiresIn: 86400 });

exports.createToken = async (user, statusCode, res) => {
  try {
    const token = this.signInToken(user._id);
    return res.status(statusCode).json({
      status: "Success",

      data: {
        user,
        token,
      },
    });
  } catch (e) {
    Errorhandler(400, res, e);
  }
};
