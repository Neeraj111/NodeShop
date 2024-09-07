
const mongoose = require('mongoose');
const config =require("config")
const debugLog = require("../utils/debug")


    


mongoose
    .connect(`${config.get("MONGODB_URI")}/Project`)
    .then(function(){
        debugLog("connected");
        
    })
    .catch(function(){
      debugLog("not connected");
        
    })


// Your application logic here




module.exports = mongoose.connection ;