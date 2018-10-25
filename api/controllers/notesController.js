const Note = require('../models/notesModel');

module.exports = {
  // Get Notes
  getNotes: async (req, res, next) => {
    try {
      const note = await Note.find();
      res.status(200).json(note);
    } catch (err) {
      next(err);
    }
  },

  getNoteById: async (req, res, next) => {
    try {
      const note = await Note.findOneAndUpdate();
      return res.status(200).json(note);
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
      const { noteId } = req.params;
      const updateNote = req.body;
      const updated = await Note.findOneAndUpdate(noteId, updateNote);
      return res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  }

  // // Delete Note
  // deleteNote: async (req, res, next) => {
  //   try {
  //     const noteId = req.params.id;

  //     Note.NoteSchema.destroy({
  //       where: {
  //         id: noteId
  //       }
  //     });
  //     return res.status(201).json(note);
  //   } catch (err) {
  //     next(err);
  //   }
  // }
};
