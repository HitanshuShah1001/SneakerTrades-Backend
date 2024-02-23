const multer = require("multer");
const Errorhandler = require("../Errorhandler/Errorhandler");
const {
  UPLOADREQUESTSDIRECTORY,
  SNEAKERUPLOADSDIRECTORY,
  PLEASEUPLOADONLYIMAGE,
} = require("../Constants/constants");

const generateFileName = (file) => {
  return file?.originalname?.split(" ").join("-");
};

const generateFileNameAndSave = (req, file, cb) => {
  const fileName = generateFileName(file);
  const userId = req.user._id;
  if (!userId) {
    return Errorhandler(401, req.res, `Please login!`);
  }
  const currentDateInMs = Date.now();
  cb(null, `${userId}-${fileName}-${currentDateInMs}`);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, SNEAKERUPLOADSDIRECTORY);
  },
  filename: function (req, file, cb) {
    generateFileNameAndSave(req, file, cb);
  },
});

const requestPhotoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADREQUESTSDIRECTORY);
  },
  filename: function (req, file, cb) {
    generateFileNameAndSave(req, file, cb);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    return Errorhandler(400, req.res, PLEASEUPLOADONLYIMAGE);
  }
};

const upload = multer({ storage, fileFilter: multerFilter });
const uploadRequest = multer({
  storage: requestPhotoStorage,
  fileFilter: multerFilter,
});

exports.UserPhoto = upload.single("ProfilePhoto");
exports.SneakerPhoto = uploadRequest.single("Photo");
exports.SneakerPhotos = upload.array("Photos");
