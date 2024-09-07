const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

module.exports = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash("error", " login first")
        return res.redirect("/")
    }
    try {
        const data = jwt.verify(req.cookies.token, process.env.JWT_KEY)
        const user = await userModel.findOne({ email: data.email }).select("-password")
        if (!user) {
            // Respond with a 404 Not Found status if the user is not found
            res.flash("error","user not found");
            res.redirect("/")
        }
        req.user = user;
        next()
    } catch (error) {
        res.flash("error","something went wrong");
        res.redirect("/")
        // next()

    }
}