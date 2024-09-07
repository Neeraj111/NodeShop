const express = require("express");
const router = express.Router();
const isOwnerLoggedIn= require("../middlewares/isOwnerLoggedIn");
const productModel = require("../models/productModel")



// const isLoggedIn = require("../middlewares/isLoggedIn");
const { ownerCreate, ownerLogin, ownerLogout } = require("../controllers/authController");
// require('dotenv').config();

if (process.env.NODE_ENV === "development") {
  router.post("/ownerCreate", ownerCreate);
}

router.post("/ownerLogin",ownerLogin);

router.get("/ownerLogout",ownerLogout);


router.get("/admin",isOwnerLoggedIn, async (req, res) => {
  let success = req.flash("success")
  let products = await productModel.find();
  res.render("admin",{products,success});
});

router.get("/", (req, res) => {
  res.send("owner routes");
});

module.exports = router;
