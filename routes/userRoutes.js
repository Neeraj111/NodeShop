const express = require("express");
const router = express.Router();
const {registerUser,loginUser,logout} = require("../controllers/authController");


router.post("/register",registerUser );

router.post("/login",loginUser);

router.get("/logout", logout );

router.get("/", (req, res) => {
    res.send("user routes");
});

module.exports = router;