

const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        minLength:3,
        trim:true,
    },
    email: String,
    password: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    }],
    orders: {
        type: Array,
        default: []
    },
    contactNumber: Number,
    picture: String,

})

module.exports = mongoose.model("user",userSchema)




// product
// image
// name
// price
// discountPrice
// bgColor
// panelColor
// textColor

