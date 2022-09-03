const express = require('express');
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/user", require('./routes/users.routes'));

app.get("/", (req, res) => {
    res.send("Server running");
});

app.all("*", (req, res) => {
    res.status(404).send("No route found");
});

app.listen(port, () => console.log("Server running in " + port));