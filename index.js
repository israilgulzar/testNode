const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
require("dotenv").config()

const api = require("./routes")
const databaseConnection = require("./db/connection")
const PORT = 4500

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors())

app.get("/test", (req, res) => {
    res.send("API is working successfully")
})

api(app)
databaseConnection()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
