const User = require("../models/User");

//@Todo - Find the corresponding sneakers for the user and delete them as well.
exports.DeleteUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const userToDelete = await User.findByIdAndDelete({ _id });
    res.status(201).json({
      status: `Success`,
      message: `User Deleted Succesfully`,
    });
  } catch (e) {
    console.log(e, `Error occured in deleting user`);
  }
};
