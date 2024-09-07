const jwt = require("jsonwebtoken")
const ownerModel = require("../models/ownerModel")

module.exports = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash("error", " login first")
        return res.redirect("/adminAuth")
    }
    try {
        const data = jwt.verify(req.cookies.token, process.env.JWT_KEY)
        const owner = await ownerModel.findOne({ email: data.email }).select("-password")
        if (!owner) {
            // Respond with a 404 Not Found status if the user is not found
            req.flash("error","owner not found");
            res.redirect("/adminAuth")
        }
        req.owner = owner;
        next()
    } catch (error) {
        req.flash("error","something went wrong");
        res.redirect("/adminAuth")
        // next()

    }
}