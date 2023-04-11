const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const getNotesData = () => {
  const jsonData = fs.readFileSync(path.join(__dirname, "../data/db.json"));
  console.log("getNotesData");
  return JSON.parse(jsonData);
};

function createNewNotes(body, notesArray) {
  const note = body;
  console.log("createNewNotes: ", note, notesArray);
  notesArray.push({ ...note, id: uuidv4() });
  fs.writeFileSync(
    path.join(__dirname, "../data/db.json"),
    JSON.stringify(notesArray, null, 2)
  );
  return note;
}

function saveNotesData(data) {
  console.log("saveNotesData ", data);

  fs.writeFileSync(
    path.join(__dirname, "../data/db.json"),
    JSON.stringify(data, null, 2)
  );
  // getNotesData();
  return data;
}

function deleteNotes(id, data) {
  console.log("deleteNotes");
  const filterNotes = data.filter((item) => item.id !== id);

  saveNotesData(filterNotes);
  return filterNotes;
}

function validateNotes(note) {
  if (!note.text || typeof note.text !== "string") {
    return false;
  }
  if (!note.title || typeof note.title !== "string") {
    return false;
  }

  return true;
}

module.exports = {
  getNotesData,
  saveNotesData,
  createNewNotes,
  deleteNotes,
  validateNotes,
};