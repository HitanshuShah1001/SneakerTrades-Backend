const multer = require("multer");
const s3Storage = require("../Utils/S3ClientIntiate");
const {
  REQUESTS_CONTAINER,
  PROFILE_PHOTO_CONTAINER,
  SNEAKER_PHOTO_CONTAINER,
  PROFILE_PHOTO,
  REQUEST_PHOTO,
  SNEAKER_PHOTOS,
} = require("../Constants/constants");

// our middleware
const uploadRequestImage = multer({
  storage: s3Storage(REQUESTS_CONTAINER),
  limits: {
    fileSize: 1024 * 1024 * 5, // 2mb file size
  },
});

const uploadProfileImage = multer({
  storage: s3Storage(PROFILE_PHOTO_CONTAINER),
  limits: {
    fileSize: 1024 * 1024 * 5, // 2mb file size
  },
});

const uploadSneakerImage = multer({
  storage: s3Storage(SNEAKER_PHOTO_CONTAINER),
});

exports.UserPhoto = uploadProfileImage.single(PROFILE_PHOTO);
exports.SneakerPhoto = uploadRequestImage.single(REQUEST_PHOTO);
exports.SneakerPhotos = uploadSneakerImage.array(SNEAKER_PHOTOS);
