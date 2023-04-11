const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const notes = require("../../data/db.json");
const {
  validateNotes,
  createNewNotes,
  // saveNotesData,
  deleteNotes,
} = require("../../lib/notes");

router.get("/notes", (req, res) => {
  let results = notes;
  console.log("GET", results);
  return res.json(results);
});

router.post("/notes", (req, res) => {
  if (!validateNotes(req.body)) {
    res.status(400).send("The notes is not properly formatted.");
  } else {
    const note = createNewNotes(req.body, notes);
    return res.json(note);
  }
});

router.delete("/notes/:id", (req, res) => {
  const note = deleteNotes(req.params.id, notes);
  return res.json(note);
});

module.exports = router;