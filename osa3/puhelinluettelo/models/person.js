const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

//tää MONGODB_URI tulee .env filusta
const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose.connect(url)
    .then((result) => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("error connecting to MongoDB:", error.message);
    });

// const url =
// `mongodb+srv://anttilamdev:${password}@cluster0.k4oay.mongodb.net/person?retryWrites=true&w=majority&appName=Cluster0`;

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
    },
    number: {
        type: String,
        validate: {
            validator: function(v) {
              return /^(\d{2,3})-(\d{5,})$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
          },
          required: [true, 'User phone number required']
    },
});
/*
content: {
    type: String,
    minlength: 5,
    required: true
  },*/

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

//'Person' tallentuu kantaan --> People, koska se on Mongoosen konventio

/*
Modelit ovat ns. konstruktorifunktioita, jotka luovat parametrien perusteella JavaScript-olioita.
Koska oliot on luotu modelien konstruktorifunktiolla,
niillä on kaikki modelien ominaisuudet eli joukko metodeja,
joiden avulla olioita voidaan mm. tallettaa tietokantaan.
*/


/*
Moduulin ulos näkyvä osa määritellään asettamalla arvo muuttujalle module.exports.
Asetamme arvoksi modelin Person. Muut moduulin sisällä määritellyt asiat,
esim. muuttujat mongoose ja url eivät näy moduulin käyttäjälle.
*/
module.exports = mongoose.model("Person", personSchema);
