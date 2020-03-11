const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db.config");
db.connect();

// For parsing application/json
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

// Manage request for any domain MIddleware
app.use(cors());

// Routers
app.use("/api/v1", require("./routes/index.route")());

// App listen on post
app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});

