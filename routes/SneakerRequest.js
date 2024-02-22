const express = require("express");
const router = express.Router();
const AuthController = require("../controller/Authcontroller");
const UserController = require("../controller/Usercontroller");
const { CreateRequest } = require("../RequestFactory/Sneaker");
const {
  GetAllSneakerRequestsNotDoneByUser,
  GetAllSneakerRequestsUploadedByUser,
} = require("../FetchFactory/SneakerRequest");

router.post(
  "/createrequest",
  AuthController.Protect,
  UserController.SneakerPhoto,
  CreateRequest
);

router.get(
  "/requests/",
  AuthController.Protect,
  GetAllSneakerRequestsNotDoneByUser
);

router.get(
  "/requestscreated/",
  AuthController.Protect,
  GetAllSneakerRequestsUploadedByUser
);

module.exports = router;
