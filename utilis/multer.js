const multer = require("multer");
// const path = require("path");
// Multer config
const fileStorageEngine = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./uploads");
        }
    }),
    filename: (req, file, cb) => {
        cb(null, Date.now() + "__" + file.orginalname)
    },

});
const upload = multer({ storage: fileStorageEngine })

module.export = multer