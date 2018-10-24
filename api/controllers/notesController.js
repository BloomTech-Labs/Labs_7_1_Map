// const express = require('express');
// const router = express.Router();
const Notes = require('./models/notesModel');

module.exports = {
  // Get all notes
  // getNoteById: async(req, res) => {
  //     const { id } = req.params;
  //     const query = Notes.findById(id);
  //     query
  //       .then(note => {
  //         if (!note) {
  //           res.status(404).json({ message: 'Note does not exist' });
  //         }
  //         res.status(200).json(note);
  //       })
  //       .catch(err => {
  //         res.status(500).json({ errorMessage: 'Note could not be retrieved' });
  //       });
  // },
  // to save a note
  // note = new Note({text: 'some note', user: <the user id for user trying to save note>})
  // note.saveNote()
  // //get all notes for user
  // getNotes = async (req, res) => {
  //     await this.populate(Notes);
  // },
  // saveNote = async (req, res) => {
  //     await this.save();
  //     const user = await User.find({ _id: this.user });
  //     user.notes.push(this._id);
  //     await user.save();
  // },
  //   // Post note to database
  //   router.route('/api/notes/').post((req, res) => {
  //     if (!req.body.text) {
  //       res.status(400).json({ errorMessage: 'Please provide text for the note' });
  //     } else {
  //       const newNote = new Notes(req.body);
  //       newNote
  //         .save()
  //         .then(newNote => {
  //           res.status(201).json(newNote);
  //         })
  //         .catch(err => {
  //           res.status(500).json({
  //             errorMessage: 'There was an error saving the note'
  //           });
  //         });
  //     }
  //   });
  //   // Update a note by Id
  //   router.route('/api/notes/:id').put((req, res) => {
  //     const { id } = req.params;
  //     const update = req.body;
  //     if (!update.text) {
  //       res.status(400).json({ errorMessage: 'Please provide text for the note' });
  //     } else {
  //       const query = Notes.findByIdAndUpdate(id, update);
  //       query
  //         .then(note => {
  //           if (!note) {
  //             res.status(404).json({
  //               message: 'Note does not exist'
  //             });
  //           } else {
  //             res.status(200).json(note);
  //           }
  //         })
  //         .catch(err => {
  //           res
  //             .status(500)
  //             .json({ errorMessage: 'The note could not be modified' });
  //         });
  //     }
  //   });
  //   // Delete a note by Id
  //   router.route('/api/notes/:id').delete((req, res) => {
  //     const { id } = req.params;
  //     const query = Notes.findByIdAndRemove(id)
  //       .then(note => {
  //         if (!note) {
  //           res.status(400).json({ message: 'Note does not exist' });
  //         }
  //         res.status(204).json({ message: 'Note successfully deleted' });
  //       })
  //       .catch(err => {
  //         res.status(500).json({ errorMessage: 'The note could not be removed' });
  //       });
  //   })
};
