exports.setFilename = (req, file) => {
  let fileName = "";
  if (req.user !== undefined) {
    fileName += `${req.user._id}_${Date.now()}_${file.fieldname}_${
      file.originalname
    }`;
  } else {
    fileName += `${Date.now()}_${file.fieldname}_${file.originalname}`;
  }
  return fileName;
};
