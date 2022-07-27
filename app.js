const database = require("./js/database.js");
const email = require("./js/email.js");
const express = require("express");

const app = express();
app.use(express.static("public"))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/index.html")
})

app.listen(3000, () => console.log("Server Started on Port 3000"))