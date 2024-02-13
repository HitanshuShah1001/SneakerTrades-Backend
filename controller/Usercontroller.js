const multer = require("multer");
const Errorhandler = require("../Errorhandler/Errorhandler");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file?.originalname?.split(" ").join("-");
    cb(null, `${fileName}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    return Errorhandler(400, res, `Please Upload Only Image`);
  }
};

const upload = multer({ storage, fileFilter: multerFilter });

exports.UserPhoto = upload.single("ProfilePhoto");
exports.SneakerPhotos = upload.array("Photos");
