const bcrypt = require("bcrypt")
const userModel = require("../models/userModel")
const ownerModel = require("../models/ownerModel");
const { generateTokenUser, generateTokenOwner } = require("../utils/generateToken")

module.exports.registerUser = async (req, res) => {
    try {
        let { email, password, fullName } = req.body
        let existedUser = await userModel.findOne({ email: email })
        if (existedUser){
            req.flash("error","user already exixts")
            res.redirect("/")
        }
        else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, async function (err, hash) {
                    if (hash) { 
                        let createdUser = await userModel.create({
                            email: email,
                            password: hash,
                            fullName: fullName,
                        })
                        let token = generateTokenUser(createdUser)
                        res.cookie("token", token)
                        req.flash("success", "User created successfully")
                        return res.redirect("/")
                     }
                    else {
                        return res.send(err.message)   
                    }
                })
            })
        }
    } catch (error) {
        console.log(error.message);
    }

}

module.exports.loginUser = async (req,res) => {
    let{email, password} = req.body;
    // find user in the database
    let existedUser = await userModel.findOne({email:email});
    // if user does not exists 
    if(!existedUser){
        req.flash("error","email or password is not correct")
        return res.redirect("/")
    }
    // compare the password
    const isMatch = await bcrypt.compare(password, existedUser.password);

        if (isMatch) {
            const token = generateTokenUser(existedUser);
            res.cookie("token", token);
            req.flash("success", "User logged in successfully");
            return res.redirect("/shop");
        } else {
            req.flash("error", "Email or password is not correct");
            return res.redirect("/");
        }

}

module.exports.logout = (req,res) => {
    res.cookie("token",'')
    token = req.cookies
    req.flash("error","user logged out successfully")
    res.redirect("/")

}


module.exports.ownerCreate= async (req, res) => {
    try {
      let owners = await ownerModel.find();
      if (owners.length > 0) {
        req.flash("error", "not authorised");
        return res.redirect("/adminAuth");
      }

      let { fullName, email, password } = req.body;      
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          let createdOwner = await ownerModel.create({
            fullName: fullName,
            email: email,
            password: hash,
          });
          let token = generateTokenOwner(createdOwner);
          res.cookie("token", token);
          req.flash("success", "owner created");
          return res.redirect("/adminAuth");
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  }

module.exports.ownerLogin = async (req,res) => {
    let{email, password} = req.body;
    // find user in the database
    let existedOwner = await ownerModel.findOne({email:email});
    
    // if user does not exists 
    if(!existedOwner){
        req.flash("error","not authorised")
        return res.redirect("/adminAuth")
    }
    // compare the password
    const isMatch = await bcrypt.compare(password, existedOwner.password);

        if (isMatch) {
            const token = generateTokenOwner(existedOwner);
            res.cookie("token", token);
            req.flash("success", "Owner logged in successfully");
            return res.redirect("/owners/admin");
        } else {
            req.flash("error", "Email or password is not correct");
            return res.redirect("/adminAuth");
        }

}

module.exports.ownerLogout = (req,res) => {
    res.cookie("token",'')
    token = req.cookies
    req.flash("error","Owner logged out successfully")
    res.redirect("/adminAuth")

}