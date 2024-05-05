const multer = require("multer");
const s3Storage = require("../Utils/S3ClientIntiate");

// our middleware
const uploadRequestImage = multer({
  storage: s3Storage("sneakertradesrequestsphotos"),
  limits: {
    fileSize: 1024 * 1024 * 5, // 2mb file size
  },
});

const uploadProfileImage = multer({
  storage: s3Storage("sneakertradesrequestsphotos"),
  limits: {
    fileSize: 1024 * 1024 * 5, // 2mb file size
  },
});

const uploadSneakerImage = multer({
  storage: s3Storage("sneakertradesrequestsphotos"),
});

exports.UserPhoto = uploadProfileImage.single("ProfilePhoto");
exports.SneakerPhoto = uploadRequestImage.single("Photo");
exports.SneakerPhotos = uploadSneakerImage.array("Photos");
