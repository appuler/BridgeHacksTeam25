const mongoose = require("mongoose");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@cluster0.d0ysy.mongodb.net/?retryWrites=true&w=majority`

async function connect() {mongoose.connect(uri)
  .then(() => console.log("Database Connected"))
  .catch(err => console.log("Database Not Connected\n" + err));
};

const personSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  phone: String,
  password: String
})

const Person = mongoose.model("Person", personSchema);

const medicineSchema = new mongoose.Schema({
  username: String,
  name: String,
  dosage: Number,
  time: Number,
  timerSet: Boolean
});

const Medicine = new mongoose.model("Medicine", medicineSchema);

async function createNewPerson(personData) {
  let person = new Person(personData);
  await person.save();
};

async function createMedicine(medicineData) {
  let medicine = new Medicine(medicineData);
  await medicine.save()
};

async function findPerson(user) {
  let person = await Person.findOne({username: user});
  return person
};

async function findAllMedicine(data) {
  let medicineArray = await Medicine.find(data);
  return medicineArray
};

async function updateMedicine(username, name, data) {
  await Medicine.updateOne({username: username, name: name}, data);
};

async function main() {

  connect();
  let person = await findPerson("Finer");
  // findAllMedicine("Finer").then((value) => console.log(value));

  await Medicine.find().then((value) => console.log(value));
  console.log(person)

  
};


module.exports = {connect, createNewPerson, createMedicine, findPerson, findAllMedicine, updateMedicine}

