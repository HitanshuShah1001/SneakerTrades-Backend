module.exports = (statusCode, res, message) => {
  return res.status(statusCode).json({
    status: "Fail",
    message,
  });
};
