const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv").config()
const path = require("path")
const api = require("./routes")

const app = express()
const databaseConnection = require("./database/connection")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


app.get("/test", (req, res) => {
    res.send("API is working successfully")
})

//connection with mongo db
databaseConnection()

//route call
api(app)


app.listen({ port: process.env.PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:` + process.env.PORT)
)
    .on("error", (err) => {
        console.log(err)
        process.exit()
    })
    .on("close", () => {
        channel.close()
    })


