const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig")
const producModel = require("../models/productModel");
const isOwnerLoggedIn = require("../middlewares/isOwnerLoggedIn");

router.post("/create", upload.single("image"), async (req, res) => {
    try {
        let { name, price, discount, bgColor, panelColor, textColor } = req.body
        let product = await producModel.create({
            name: name,
            price: price,
            discount: discount,
            bgColor: bgColor,
            panelColor: panelColor, 
            textColor: textColor,
            image: req.file.buffer
        })
        req.flash("success", "product is created")
        res.redirect("/owners/admin");

    } catch (error) {
        res.send(error.message)
    }
});


router.get("/create",isOwnerLoggedIn, (req, res) => {

    res.render("createProducts");
});
router.get("/", (req, res) => {

    res.send("products routes");
});

module.exports = router;