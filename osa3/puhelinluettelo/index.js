const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

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
    res.json(persons);
});

app.get("/info", (req, res) => {
    const now = new Date();
    const data = `Phonebook has info for ${persons.length} people` + "<br/>" +
        `</br> ${now.toUTCString()}`;
    res.send(data);
});

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const person = persons.find((p) => p.id === id);

    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    persons = persons.filter((person) => person.id !== id);
    response.status(204).end();
});

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map((n) => Number(n.id)))
        : 0;
    return String(maxId + 1);
};

app.put("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    const body = request.body;

    const foundPerson = persons.find((p) => p.id === id);
    // console.log("foundPerson", foundPerson);

    const updatedPerson = {
        name: body.name,
        number: body.number,
        id: foundPerson.id,
    };

    if (updatedPerson) {
        persons = persons.map((person) => person.id === id ? updatedPerson : person);
        response.json(updatedPerson);
    } else {
        return response.status(400).json({
            error: "Person not found",
        });
    }
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

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    };
    persons = persons.concat(person);
    response.json(person);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
