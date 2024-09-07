const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")

app.use(cookieParser())
const path = require("path")
const flash = require("connect-flash")
const expressSession = require("express-session")
// const config = require("config")

require('dotenv').config();

const debugLog = require("./utils/debug")

const index = require("./routes/index")
const ownerRoutes = require("./routes/ownerRoutes")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")

const db = require("./config/dbConnection")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")));
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET,
}))
// Set up flash middleware
app.use(flash());

// Middleware to make flash messages available to views
// app.use((req, res, next) => {
//     res.locals.messages = req.flash();
//     next();
// });

app.set("view engine","ejs")

app.use("/",index)
app.use("/owners",ownerRoutes)
app.use("/users", userRoutes)
app.use("/owners/products",productRoutes)

app.listen(3000,()=>{
    debugLog("running");
    
})

