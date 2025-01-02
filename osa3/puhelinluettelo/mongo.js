const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

/*
käyttö
node mongo.js <salasana>
--> lisää Mongoose tietokantaan uuden dokumentin?
*/
const password = process.argv[2];
const personName = process.argv[3];
const personNumber = process.argv[4];

const url =
  `mongodb+srv://anttilamdev:${password}@cluster0.k4oay.mongodb.net/person?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

//'Note' tallentuu kantaan --> Notes, koska se on Mongoosen konventio
const Person = mongoose.model("Person", personSchema);

/*
Modelit ovat ns. konstruktorifunktioita, jotka luovat parametrien perusteella JavaScript-olioita.
Koska oliot on luotu modelien konstruktorifunktiolla,
niillä on kaikki modelien ominaisuudet eli joukko metodeja,
joiden avulla olioita voidaan mm. tallettaa tietokantaan.
*/
const person = new Person({
  name: `${personName}`,
  number: `${personNumber}`,
});

if (!process.argv[3] || !process.argv[4]) {
  Person.find({}).then((persons) => {
    persons.forEach((p) => {
      console.log(`${p.name} ${p.number}`);
    });
    mongoose.connection.close();
  });
} else {
  person.save().then((result) => {
    console.log(result);
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}
