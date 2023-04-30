const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
var corsOptions = {
    origin: process.env.ORIGIN
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
    res.send("Express on js");
});
require("./app/routes/users.routes")(app);
require("./app/routes/titles.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT;
const PORT_TITLES = process.env.PORT_TITLES;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
module.exports = app