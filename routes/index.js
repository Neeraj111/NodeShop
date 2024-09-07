const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const router = express.Router();

router.get("/",(req,res)=>{
    let error = req.flash("error")
    let success = req.flash("success")
    res.render("index",{error,success, loggedin :false});
});

router.get("/shop",isLoggedIn, async (req,res)=>{
    let success = req.flash("success")
    let products = await productModel.find();
    res.render("shop",{products, success})
    // res.send("shop")
})
router.get("/cart",isLoggedIn, async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email}).populate("cart");
    
    res.render("cart",{user})
    // res.send("shop")
})

router.get("/adminAuth",(req,res)=>{
    let error = req.flash("error")
    let success = req.flash("success")
    res.render("adminAuth",{error, success, loggedinOwner:false})
})

router.get("/add-to-cart/:productid",isLoggedIn, async (req,res)=>{
    let user = await userModel.findOne({email: req.user.email})    
    user.cart.push(req.params.productid)
    await user.save()
    req.flash("success","added to cart")
    res.redirect("/shop")


})





module.exports = router;