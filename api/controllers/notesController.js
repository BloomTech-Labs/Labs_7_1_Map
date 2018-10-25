const Note = require('../models/notesModel');

module.exports = {
  // Get Notes
  getNoteById: async (req, res, next) => {
    try {
      const note = await Note.find({});
      res.status(200).json(note);
    } catch (err) {
      next(err);
    }
  },

  // Post Note
  postNote: async (req, res, next) => {
    try {
      const newNote = new Note(req.body);
      const note = await newNote.save();
      res.status(201).json(note);
    } catch (err) {
      next(err);
    }
  },

  // Update Note
  updateNote: async (req, res, next) => {
    try {
      const noteId = req.params.id;
      const { text } = req.body;

      Note.put({ text: text }, { where: { id: noteId } });
      return res.status(201).json();
    } catch (err) {
      next(err);
    }
  },

  // Delete Note
  deleteNote: async (req, res, next) => {
    try {
      const noteId = req.params.id;

      Note.NoteSchema.destroy({
        where: {
          id: noteId
        }
      });
      return res.status(201).json(note);
    } catch (err) {
      next(err);
    }
  }
};