const multer = require("multer");
const {
  UPLOADREQUESTSDIRECTORY,
  SNEAKERUPLOADSDIRECTORY,
  USERPROFILEPHOTODIRECTORY,
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

const profilePhotoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, USERPROFILEPHOTODIRECTORY);
  },
});

const uploadProfilePhoto = multer({ storage: profilePhotoStorage });
const upload = multer({ storage: storage });
const uploadRequest = multer({
  storage: requestPhotoStorage,
});

exports.UserPhoto = uploadProfilePhoto.single("ProfilePhoto");
exports.SneakerPhoto = uploadRequest.single("Photo");
exports.SneakerPhotos = upload.array("Photos");
