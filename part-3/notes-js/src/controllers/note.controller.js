const Note = require("../models/note.model");
const { getParamsIdSchema } = require("../schemas");

const handleGetNotes = async (req, res) => {
  const notes = await Note.find({});

  if (notes.length === 0) {
    return res.status(404).json({ message: "No notes found" });
  }
  res.json(notes);
};

const handleGetNote = async (req, res) => {
  const { id } = req.params;

  const note = await Note.findById(id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
};

const handleCreateNote = async (req, res) => {
  await Note.create(req.body);

  res.json({ message: "note created" });
};

const handleUpdateNote = async (req, res) => {
  const { id } = req.params;
  const { content, important } = req.body;

  const existedNote = await Note.findById(id);

  if (!existedNote) {
    return res.status(404).json({ message: "Note not found" });
  }

  existedNote.content = content;
  existedNote.important = important;

  await existedNote.save();
  res.json({ message: "Note updated" });
};

const handleDeleteNote = async (req, res) => {
  const { id } = req.params;

  const existedNote = await Note.findById(id);

  if (!existedNote) {
    return res.status(404).json({ message: "Note note found" });
  }

  await existedNote.deleteOne();

  res.json({ message: "Note deleted" });
};

module.exports = {
  handleGetNotes,
  handleGetNote,
  handleCreateNote,
  handleDeleteNote,
  handleUpdateNote,
};
