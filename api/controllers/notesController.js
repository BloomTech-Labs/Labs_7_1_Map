const express = require('express');
const router = express.Router();
const notesModel = require('./models/notesModel');

//Middleware to Handle Errors
const awaitErrorHandlerFactory = middleware => {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

/* GET todo listing. */
router.get(
  '/api/notes',
  awaitErrorHandlerFactory(async (req, res, next) => {
    const note = await notesModels.NoteSchema.findAll({});
    return res.json({
      error: false,
      data: note
    });
  })
);

/* POST todo. */
router.post(
  '/api/notes',
  awaitErrorHandlerFactory(async (req, res, next) => {
    const { text } = req.body;
    const note = notesModel.NoteSchema.save({
      text: text,
      user: {
        type: ObjectIdSchema,
        ref: 'User'
      },
      timestamps: timestamps
    });
    return res.status(201).json({
      error: false,
      data: note,
      message: 'Country note has been created.'
    });
  })
);

/* update todo. */
router.put('/api/note/:id', function(req, res, next) {});

/* GET todo listing. */
router.delete('/:id', function(req, res, next) {});

module.exports = router;

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
