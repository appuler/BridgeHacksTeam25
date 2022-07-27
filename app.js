const database = require("./js/database.js");
const email = require("./js/email.js");
const express = require("express");
const nodeCache = require("node-cache");
const bodyParser = require("body-parser");
const { get } = require("mongoose");

const myCache = new nodeCache()

async function cachePerson(data) {
  let success = await myCache.set("personKey", data);
};

async function getPerson() {
  let person = await myCache.get("personKey");
  return person
};

const app = express();
app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));
database.connect()

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/index.html")
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/pages/login.html")
});

app.get("/signin", (req, res) => {
  res.sendFile(__dirname + "/pages/signin.html")
})

app.post("/signin", (req, res) => {
  let data = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  }

  let personfound = database.findPerson(req.body.name)
  if (personfound === null){
  database.createNewPerson(data)
  .then(()=>console.log("Person Added Successfully!"));
  res.redirect("/login");
  } else {
    res.redirect("/signin");
  }
})

app.post("/login", (req, res) => {
  let username = req.body.username
  let person = database.findPerson(username)

  if (person.password === req.body.password) {
    cachePerson({name: person.name, username: person.username})
    res.redirect("/app")
  } else {
    res.redirect("/login")
  }
})

app.get("/app", (req, res) => {
  let personData = getPerson()
  if (personData) {
    let medicineList = database.findAllMedicine({username:personData.username})
    res.render("app", medicineList);
  } else {
    res.redirect("/login");
}});

app.post("/app", (req, res) => {
  let personData = getPerson()
  if (personData) {
    let medicineData = {
      username: personData.username,
      name: req.body.name,
      dosage: req.body.dosage,
      time: req.body.time,
      timerSet: false
    }
    database.createMedicine(medicineData).then(() => console.log("Successful!"));
    res.redirect("/app")
  } else {
    res.redirect("/login")
  }
});

async function timer() {
  await database.findAllMedicine({timerSet: false})
  .then((value) => {

    for (i = 0; i < value.length; i++) {
      let medicine = value[i]
      let person = database.findPerson(medicine.username)
      setTimeout(() => {
        text = `Hello ${person.name}, It is time to take ${medicine.dosage} of ${medicine.name}`;
        email.sendMail(text)
        .then(() => console.log("Email Successful!"))
        .catch((err) => console.log(err));
      }, medicine.time * 10000);

      database.updateMedicine(getPerson().username, medicine.name, {timerSet: true})

    }
  })

}


app.listen(3000, () => console.log("Server Started on Port 3000"))
