const express = require('express');
const bodyParser = require("body-parser")
const cors = require('cors');
const app = express();
require('dotenv').config();

const api = require("./routes")
const databaseConnection = require("./db/connection")
const PORT = process.env.PORT || 7000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

api(app)
databaseConnection()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
