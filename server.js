const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/content', { useNewUrlParser: true}
).then(
    () => {console.log("Connection Success")}, err => {console.log("Connection Failed")}
);

const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

const users = require("./routes/users.js");
const content = require("./routes/content.js");

app.use("/users", users);
app.use("/content", content);

app.listen(port, () => console.log('server running on port 5000'));