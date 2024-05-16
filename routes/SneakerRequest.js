const express = require("express");
const router = express.Router();
const AuthController = require("../controller/Authcontroller");
const UserController = require("../controller/Usercontroller");
const { CreateRequest } = require("../RequestFactory/Sneaker");
const {
  GetAllSneakerRequestsUploadedByUser,
  GetSneakerRequests,
} = require("../FetchFactory/SneakerRequest");
const { DeleteSneakerRequest } = require("../DeleteFactory/SneakerRequest");
const { PaginateQuery } = require("../Utils/Pagination");

router.post(
  "/createrequest",
  AuthController.Protect,
  UserController.SneakerPhoto,
  CreateRequest
);

router.post("/requests/", PaginateQuery, GetSneakerRequests);
router.delete("/delete/:id", AuthController.Protect, DeleteSneakerRequest);
router.get(
  "/requestscreated/",
  AuthController.Protect,
  GetAllSneakerRequestsUploadedByUser
);

module.exports = router;
