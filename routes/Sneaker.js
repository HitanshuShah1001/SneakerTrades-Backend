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

router.get(
  "/forpurchase",
  AuthController.Protect,
  GetAllSneakersNotUploadedByUser
);

router.get("/search/", AuthController.Protect, GetSneakerBySearch);
router.get("/filter/", AuthController.Protect, GetSneakerByFilter);
router.get("/purchase/", AuthController.Protect, GetSneakerForPurchase);
router.get("/borrow/", AuthController.Protect, GetSneakersForBorrowing);
router.delete("/delete/:id", AuthController.Protect, DeleteSneaker);
router.patch("/hidesneaker/:id", AuthController.Protect, HideSneaker);
router.patch("/unlock", AuthController.Protect, UnlockSneaker);
module.exports = router;
