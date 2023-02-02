//Dependencies
const express = require('express');
const path = require('path');
const notes = require("./db/db.json");
const fs = require("fs");
const uuid = require("./assets/js/uuid");

//set up server
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for notes page
app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, './db/db.json'))
);

// Post function to add new notes to db.json
app.post("/api/notes", (req, res) =>{ 
    const notes = JSON.parse(fs.readFileSync('./db/db.json'));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json".JSON.stringify(notes));
    res.json(notes)
});

//Deleting notes
app.delete("/api/notes/:id", (req, res) =>{
    const notes = JSON.parse(fs.readFileSync('./db/db.json'));
    const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json".JSON.stringify(delNote));
    res.json(delNote);
});

// HTML calls for homepage
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./index.html"))    
});

// HTML calls for notes page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./notes.html"))    
});

//start listen
app.listen(PORT, function(){
    console.log(`App listening at http://localhost:${PORT} 🚀`)
});