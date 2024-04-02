const express = require("express");
const router = express.Router();
const { UploadSneaker } = require("../CreateFactory/Sneaker");
const {
  GetAllSneakersUploadedByUser,
  GetAllSneakersNotUploadedByUser,
  GetSneakerBySearch,
  GetSneakerByFilter,
  GetSneakerForPurchase,
  GetSneakersForBorrowing,
  GetSneakers,
} = require("../FetchFactory/Sneaker");
const AuthController = require("../controller/Authcontroller");
const UserController = require("../controller/Usercontroller");
const { DeleteSneaker } = require("../DeleteFactory/Sneaker");
const { HideSneaker } = require("../UnlockFactory/Sneaker");
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
  PaginateQuery,
  GetAllSneakersUploadedByUser
);

router.post("/forpurchaseandborrow", AuthController.Protect, GetSneakers);

router.delete("/delete/:id", AuthController.Protect, DeleteSneaker);
router.patch("/hidesneaker/:id", AuthController.Protect, HideSneaker);

module.exports = router;
