const express = require("express");
const router = express.Router();
const { UploadSneaker } = require("../CreateFactory/Sneaker");
const {
  GetAllSneakersUploadedByUser,
  GetSneakers,
} = require("../FetchFactory/Sneaker");
const AuthController = require("../controller/Authcontroller");
const UserController = require("../controller/Usercontroller");
const { DeleteSneaker } = require("../DeleteFactory/Sneaker");
const { PaginateQuery } = require("../Utils/Pagination");
router.post(
  "/upload",
  AuthController.Protect,
  UserController.SneakerPhotos,
  UploadSneaker
);

router.get(
  "/getsneakersowned",
  AuthController.Protect,
  GetAllSneakersUploadedByUser
);

router.post(
  "/forpurchaseandborrow",
  AuthController.Protect,
  PaginateQuery,
  GetSneakers
);

router.delete("/delete/:id", AuthController.Protect, DeleteSneaker);

module.exports = router;
