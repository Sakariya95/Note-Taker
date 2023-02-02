const express = require('express');
const path = require('path');
const api = require("./db/db.json");
const fs = require("fs");
const uuid = require("uuid");

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for notes page
app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, './db/db.json'))
);

// Post function to add new notes to db.json
app.post("/api/notes", (req, res) =>{ 
    const api = JSON.parse(fs.readFileSync('./db/db.json'));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    api.push(newNotes);
    fs.writeFileSync("./db/db.json".JSON.stringify(api));
    res.json(api)
});