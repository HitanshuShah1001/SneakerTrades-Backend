const User = require("../models/User");

exports.GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      status: `Success`,
      users,
      count: users.length,
    });
  } catch (e) {
    console.log(e, `Error occured`);
  }
};

exports.GetIndividualUser = async (req, res) => {
  try {
    const { phone: Phone } = req.body;
    const user = await User.find({ Phone });
    const userobj =
      user.length > 0
        ? { status: `Success`, user }
        : { status: `Success`, user: null, message: `User not found!` };
    return res.status(200).json({
      status: `Success`,
      ...userobj,
    });
  } catch (e) {
    console.log(e, `Error occured`);
  }
};
exports.GetIndividualUserByEmail = async (req, res) => {
  try {
    const { email: Email } = req.body;
    const user = await User.find({ Email });
    const userobj =
      user.length > 0
        ? { status: `Success`, user }
        : { status: `Success`, user: null, message: `User not found!` };
    return res.status(200).json({
      status: `Success`,
      ...userobj,
    });
  } catch (e) {
    console.log(e, `Error occured`);
  }
};
