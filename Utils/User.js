const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.signInToken = (id) =>
  jwt.sign({ id }, process.env.SECRET, { expiresIn: 86400 });

exports.createToken = async (user, statusCode, res) => {
  const token = this.signInToken(user._id);
  return res.status(statusCode).json({
    status: "Success",
    token,
    data: {
      user,
    },
  });
};
