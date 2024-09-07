const jwt = require('jsonwebtoken')

const generateTokenUser = (createdUser)=>{
    return jwt.sign({email:createdUser.email, id:createdUser._id},process.env.JWT_KEY,{expiresIn:'1h'})
}
module.exports.generateTokenUser = generateTokenUser

const generateTokenOwner = (createdOwner)=>{
    return jwt.sign({email:createdOwner.email, id:createdOwner._id},process.env.JWT_KEY,{expiresIn:'1h'})
}
module.exports.generateTokenOwner = generateTokenOwner



