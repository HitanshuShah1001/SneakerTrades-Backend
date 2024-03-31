const express = require("express");
const router = express.Router();
const AuthController = require("../controller/Authcontroller");
const UserController = require("../controller/Usercontroller");
const { CreateRequest } = require("../RequestFactory/Sneaker");
const {
  GetAllSneakerRequestsNotDoneByUser,
  GetAllSneakerRequestsUploadedByUser,
  GetSneakerRequestsBySearch,
} = require("../FetchFactory/SneakerRequest");
require("../UnlockFactory/SneakerRequest");
const { PaginateQuery } = require("../Utils/Pagination");

router.post(
  "/createrequest",
  AuthController.Protect,
  UserController.SneakerPhoto,
  CreateRequest
);

router.get(
  "/requests/",
  AuthController.Protect,
  PaginateQuery,
  GetAllSneakerRequestsNotDoneByUser
);

router.get(
  "/requestscreated/",
  AuthController.Protect,
  PaginateQuery,
  GetAllSneakerRequestsUploadedByUser
);

router.get(
  "/search/",
  AuthController.Protect,
  PaginateQuery,
  GetSneakerRequestsBySearch
);

module.exports = router;
