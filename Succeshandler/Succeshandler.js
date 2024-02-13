module.exports = (statusCode, res, customData, message) => {
  const responseObj = {
    status: "Success",
  };

  if (customData !== undefined) {
    responseObj.Data = customData;
  }

  if (message !== undefined) {
    responseObj.message = message;
  }

  return res.status(statusCode).json(responseObj);
};
