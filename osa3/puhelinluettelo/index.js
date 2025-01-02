require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const person = require("./models/person");

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": "1",
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": "2",
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": "3",
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": "4",
    },
];

app.use(express.static("dist")); //check folder 'dist' and serve contents.. i guess index.html

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors()); //allow all CORS

morgan.token("olenToken", function (req, res) {
    return JSON.stringify(req.body);
});

app.use(morgan(":method :url :status :response-time ms :olenToken"));

console.log(morgan());

app.get("/api/persons", (req, res) => {
    Person.find({}).then((people) => {
        res.json(people);
    });
});

app.get("/info", (req, res) => {
    const now = new Date();

    Person.find({}).then((people) => {
        //res.json(people);
        const data = `Phonebook has info for ${people.length} people` +
            "<br/>" +
            `</br> ${now.toUTCString()}`;
        res.send(data);
    });
});

app.get("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;

    //const person = persons.find((p) => p.id === id);

    //toi findById mongoosen modelin metodi
    //is used to find a single document by its _id field in MongoDB
    Person.findById(id).then((person) => {
        if (person) {
            res.json(person);
        } else {
            res.status(404).end();
        }
    }).catch((error) => next(error));
    //! huom toi next. vie käsittelyn eteenpäin
    //Jos funktion next kutsussa annetaan parametri,
    //siirtyy käsittely virheidenkäsittelymiddlewarelle.
});

app.delete("/api/persons/:id", (request, response, next) => {
    const id = request.params.id;

    // persons = persons.filter((person) => person.id !== id);
    // response.status(204).end();
    Person.findByIdAndDelete(id).then((result) => {
        response.status(204).end(); //204 no content
    }).catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
    const id = request.params.id;
    const body = request.body;

    const updatedPerson = {
        name: body.name,
        number: body.number,
    };

    //new: true: Returns the modified document rather than the original.
    Person.findByIdAndUpdate(id, updatedPerson, { new: true })
        .then((result) => {
            response.json(result);
        }).catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "info is missing",
        });
    }
    if (persons.find((p) => p.name === body.name)) {
        return response.status(400).json({
            error: "name must be unique",
        });
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save().then((savedPerson) => {
        response.json(savedPerson);
    });
});

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    //CastError-poikkeuksesta eli virheellisestä olio-id:stä
    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    }

    next(error);
};

//! tää kans tärkeää vasta täällä lopussa, koska tää nappaa kiinni KAIKKIIN
//! pyyntöihin niin sit kaikki routet vaa antais 404
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

//! huom tää rekisteröinti pitää tehdä vasta täällä lopussa
app.use(errorHandler);
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
