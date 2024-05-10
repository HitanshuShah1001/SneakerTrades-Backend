const Errorhandler = require("../Errorhandler/Errorhandler");
const Successhandler = require("../Succeshandler/Succeshandler");
const Query = require("../models/Query");

exports.CreateQuery = async (req, res) => {
  try {
    const {
      user: { _id },
      body,
    } = req;
    const queryCreation = await Query.create({
      ...body,
      RaisedBy: _id,
    });
    Successhandler(201, res, undefined, `Query raised succesfully`);
  } catch (error) {
    Errorhandler(400, res, error.message);
  }
};
