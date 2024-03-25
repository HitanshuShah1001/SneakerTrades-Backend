const multer = require("multer");
const Errorhandler = require("../Errorhandler/Errorhandler");
const {
  UPLOADREQUESTSDIRECTORY,
  SNEAKERUPLOADSDIRECTORY,
} = require("../Constants/constants");

const requestPhotoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADREQUESTSDIRECTORY);
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, SNEAKERUPLOADSDIRECTORY);
  },
});

const upload = multer({ storage: storage });
const uploadRequest = multer({
  storage: requestPhotoStorage,
});

exports.UserPhoto = upload.single("ProfilePhoto");
exports.SneakerPhoto = uploadRequest.single("Photo");
exports.SneakerPhotos = upload.array("Photos");
