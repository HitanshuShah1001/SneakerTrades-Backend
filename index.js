const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const UserRouter = require("./routes/User");
const SneakerRouter = require("./routes/Sneaker");
const SneakerRequestRouter = require("./routes/SneakerRequest");
const UserSubscriptionRouter = require("./routes/UserSubscription");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => console.log(e, "Error"));
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.use("/user/", UserRouter);
app.use("/sneaker/", SneakerRouter);
app.use("/sneakerrequests/", SneakerRequestRouter);
app.use("/usersubscription/", UserSubscriptionRouter);
