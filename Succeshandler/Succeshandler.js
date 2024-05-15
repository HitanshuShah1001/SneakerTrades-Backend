const { STATUS_SUCCESS } = require("../Constants/constants");

module.exports = (statusCode, res, customData, message) => {
  const responseObj = {
    status: STATUS_SUCCESS,
  };

  if (customData !== undefined) {
    responseObj.Data = customData;
  }

  if (message !== undefined) {
    responseObj.message = message;
  }

  return res.status(statusCode).json(responseObj);
};
