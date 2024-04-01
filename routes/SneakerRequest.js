const express = require("express");
const router = express.Router();
const AuthController = require("../controller/Authcontroller");
const UserController = require("../controller/Usercontroller");
const { CreateRequest } = require("../RequestFactory/Sneaker");
const {
  GetAllSneakerRequestsNotDoneByUser,
  GetAllSneakerRequestsUploadedByUser,
  GetSneakerRequestsBySearch,
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

router.get(
  "/requests/",
  AuthController.Protect,
  PaginateQuery,
  GetSneakerRequests
);

router.get(
  "/requestscreated/",
  AuthController.Protect,
  PaginateQuery,
  GetAllSneakerRequestsUploadedByUser
);

module.exports = router;
