const multer = require("multer")
// create memory Storage(database storage)
const storage = multer.memoryStorage()
const upload = multer({storage:storage})

module.exports = upload