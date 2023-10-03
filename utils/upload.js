const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        const customPrefix = "ig"

        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)

        const extname = path.extname(file.originalname).toLowerCase()

        const finalFilename = customPrefix + "-" + uniqueSuffix + extname

        cb(null, finalFilename)
    },
})

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = [".jpg", ".jpeg", ".png", ".pdf", ".doc", ".docx"]
    const extname = path.extname(file.originalname).toLowerCase()

    if (allowedFileTypes.includes(extname)) {
        cb(null, true)
    } else {
        const error = new Error("File type not supported.")
        error.status = 400
        cb(error, false)
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

module.exports = upload
