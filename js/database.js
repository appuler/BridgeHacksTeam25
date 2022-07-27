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
});

const Medicine = new mongoose.model("Medicine", medicineSchema);

async function createNewPerson(personData) {
  const person = new Person(personData);
  await person.save();
};

async function createMedicine(medicineData) {
  const medicine = new Medicine(medicineData);
  await medicine.save()
}

async function findPerson(user) {
  person = await Person.findOne({username: user});
  return person
}

async function findAllMedicine(user) {
  medicineArray = await Medicine.find({username: user});
  return medicineArray
}

async function main() {

  connect();
  await findPerson("Finer").then((value) => console.log(value.id));
  findAllMedicine("Finer").then((value) => console.log(value));
  
  
};

module.exports = {connect, createNewPerson, createMedicine, findPerson, findAllMedicine}

