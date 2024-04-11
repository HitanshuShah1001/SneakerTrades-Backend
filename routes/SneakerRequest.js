const express = require("express");
const router = express.Router();
const AuthController = require("../controller/Authcontroller");
const UserController = require("../controller/Usercontroller");
const { CreateRequest } = require("../RequestFactory/Sneaker");
const {
  GetAllSneakerRequestsUploadedByUser,
  GetSneakerRequests,
} = require("../FetchFactory/SneakerRequest");
require("../UnlockFactory/SneakerRequest");
const { PaginateQuery } = require("../Utils/Pagination");

router.post(
  "/createrequest",
  AuthController.Protect,
  UserController.SneakerPhoto,
  CreateRequest
);

router.post("/requests/", AuthController.Protect, GetSneakerRequests);

router.get(
  "/requestscreated/",
  AuthController.Protect,
  GetAllSneakerRequestsUploadedByUser
);

module.exports = router;
