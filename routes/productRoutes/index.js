
const productControllers = require("../../controllers/product")
const upload = require("../../utils/upload")
const fs = require("fs")
const path = require("path")
const uploadDirectory = "uploads"
const { makeRespObj } = require("../../AppUtils/")
const AdminAuth = require("../../helpers/middlewares/adminAuth")
const UserAuth = require("../../helpers/middlewares/auth")

module.exports = async (app) => {
    app.post("/product/getProductList", async (req, res) => {
        const data = await productControllers.getProductData(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/product/deleteVariantPrice", async (req, res) => {
        const data = await productControllers.deleteVariantPrice(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/product/productDetails", async (req, res) => {
        const data = await productControllers.productDetails(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/product/productManagement", async (req, res) => {
        const data = await productControllers.productManagement(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/product/productPricing", async (req, res) => {
        const data = await productControllers.productPricing(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/product/getProductById", async (req, res) => {
        const data = await productControllers.getProductById(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/product/deleteProduct", async (req, res) => {
        const data = await productControllers.deleteProduct(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/product/chnageProductStatus", async (req, res) => {
        const data = await productControllers.chnageProductStatus(req.body)
        res.status(data.status_code).json(data)
    })

    
    app.post("/product/viewsCount", async (req, res) => {
        const data = await productControllers.viewsCount(req.body)
        res.status(200).json()
    })

    app.post("/uploads", upload.single("file"), (req, res) => {
        const file = req.file
        const { filename } = req.body

        if (filename) {
            const filePath = path.join(uploadDirectory, filename)
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)

                const successResp = makeRespObj({
                    status_code: 200,
                    message: "File updated successfully.",
                    data: file ? file.filename : null,
                })

                return res.status(200).json(successResp)
            }
        }

        if (!file) {
            const errorResp = makeRespObj({
                status_code: 500,
                message: "No file provided",
            })

            return res.status(500).json(errorResp)
        }

        const successResp = makeRespObj({
            status_code: 200,
            message: "File uploaded successfully.",
            data: file ? file.filename : null,
        })

        res.status(200).json(successResp)
    })

    app.get("/download/:fileName", (req, res) => {
        const fileName = req.params.fileName
        const filePath = `uploads/${fileName}`

        res.download(filePath, (err) => {
            if (err) {
                res.status(404).json({ message: "File not found" })
            }
        })
    })

    app.get("/getFile/:fileName", (req, res) => {
        const fileName = req.params.fileName
        const filePath = `uploads/${fileName}`

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.status(404).json({ message: "File not found" })
            } else {
                res.send(data)
            }
        })
    })

    app.get("/getFiles/:fileName", (req, res) => {
        const fileName = req.params.fileName
        const filePath = `uploads/${fileName}`

        const fileStream = fs.createReadStream(filePath)

        // res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
        // res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader("Content-Type", "image/jpeg")

        fileStream.pipe(res)

        fileStream.on("error", (err) => {
            if (err.code === "ENOENT") {
                res.status(404).json({ message: "File not found" })
            } else {
                res.status(500).json({ message: "Internal Server Error" })
            }
        })
    })

    app.post("/delete", (req, res) => {
        const { filename } = req.body

        const filePath = path.join(uploadDirectory, filename)

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
            res.json({ message: `File  deleted successfully.` })
        } else {
            res.status(404).json({ message: "File not found." })
        }
    })

    // app.get("/getcontent/:fileName", (req, res) => {
    //     const fileName = req.params.fileName;
    //     const filePath = `uploads/${fileName}`;
    //     const baseUrl = process.env.BASE_URL; // Replace with your base URL
    //     // const endpoint = "/download"; // Replace with your endpoint path

    //     const fileStream = fs.createReadStream(filePath);

    //     // Construct the download URL with the name parameter
    //     const downloadUrl = `${baseUrl}?name=${encodeURIComponent(fileName)}`;

    //     // Set the Content-Disposition header with the constructed URL
    //     res.setHeader("Content-Disposition", `attachment; filename="${downloadUrl}"`);
    //     res.setHeader("Content-Type", "application/octet-stream");

    //     fileStream.pipe(res);

    //     fileStream.on("error", (err) => {
    //         if (err.code === "ENOENT") {
    //             res.status(404).json({ message: "File not found" });
    //         } else {
    //             res.status(500).json({ message: "Internal Server Error" });
    //         }
    //     });
    // });

    app.get("/getcontent/:fileName", (req, res) => {
        const fileName = req.params.fileName
        const filePath = `uploads/${fileName}`
        const baseUrl = process.env.BASE_URL

        let contentType = "image/jpeg"
        const extname = path.extname(fileName).toLowerCase()
        if (extname === ".png") {
            contentType = "image/png"
        } else if (extname === ".gif") {
            contentType = "image/gif"
        }

        const fileStream = fs.createReadStream(filePath)

        res.setHeader("Content-Type", contentType)

        fileStream.pipe(res)

        fileStream.on("error", (err) => {
            if (err.code === "ENOENT") {
                res.status(404).json({ message: "File not found" })
            } else {
                res.status(500).json({ message: "Internal Server Error" })
            }
        })
    })
}
