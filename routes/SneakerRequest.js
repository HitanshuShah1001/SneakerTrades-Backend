const express = require("express");
const router = express.Router();
const AuthController = require("../controller/Authcontroller");
const UserController = require("../controller/Usercontroller");
const { CreateRequest } = require("../RequestFactory/Sneaker");
const {
  GetAllSneakerRequestsNotDoneByUser,
  GetAllSneakerRequestsUploadedByUser,
} = require("../FetchFactory/SneakerRequest");
const {
  UnlockSneakerRequestDetail,
} = require("../UnlockFactory/SneakerRequest");
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

router.patch(
  "/unlockrequestdetail/:id",
  AuthController.Protect,
  UnlockSneakerRequestDetail
);
module.exports = router;
