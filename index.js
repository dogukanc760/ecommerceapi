const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connection successfully"))
  .catch((err) => {
    console.log(err);
  });

  app.use(express.json());
  app.use("/api/product", productRoute);
 app.use("/api/user", userRoute);
 app.use("/api/auth", authRoute);
 app.use("/api/order", orderRoute);
 app.use("/api/cart", cartRoute);
 



app.listen(process.env.PORT || 5000, () => {
  console.log("server running");
});
