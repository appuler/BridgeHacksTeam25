const mongoose = require("mongoose");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@cluster0.d0ysy.mongodb.net/?retryWrites=true&w=majority`

async function connect() {mongoose.connect(uri)
  .then(() => console.log("Database Connected"))
  .catch(err => console.log("Database Not Connected\n" + err));
};

const personSchema = new mongoose.Schema({
})

function main() {
  connect();
};

main();

