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
} = require("../FetchFactory/Sneaker");
const AuthController = require("../controller/Authcontroller");
const UserController = require("../controller/Usercontroller");
const { DeleteSneaker } = require("../DeleteFactory/Sneaker");
const { HideSneaker, UnlockSneaker } = require("../UnlockFactory/Sneaker");
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

router.get(
  "/forpurchaseandborrow",
  AuthController.Protect,
  PaginateQuery,
  GetAllSneakersNotUploadedByUser
);

router.get(
  "/search/",
  AuthController.Protect,
  PaginateQuery,
  GetSneakerBySearch
);
router.get(
  "/filter/",
  AuthController.Protect,
  PaginateQuery,
  GetSneakerByFilter
);
router.get(
  "/purchase/",
  AuthController.Protect,
  PaginateQuery,
  GetSneakerForPurchase
);
router.get(
  "/borrow/",
  AuthController.Protect,
  PaginateQuery,
  GetSneakersForBorrowing
);
router.delete("/delete/:id", AuthController.Protect, DeleteSneaker);
router.patch("/hidesneaker/:id", AuthController.Protect, HideSneaker);
router.patch("/unlock/:id", AuthController.Protect, UnlockSneaker);
module.exports = router;
