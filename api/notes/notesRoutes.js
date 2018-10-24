const express = require('express');
const router = express.Router();

const Notes = require('./notesModel');

// Get all notes
router.route('/').get((req, res) => {
  const query = Notes.find();

  query
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Notes could not be retrieved' });
    });
});

// Get note by Id
router.route('/:id').get((req, res) => {
  const { id } = req.params;
  const query = Notes.findById(id);

  query
    .then(note => {
      if (!note) {
        res.status(404).json({ message: 'Note does not exist' });
      }
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Note could not be retrieved' });
    });
});

// Post note to database
router.route('/').post((req, res) => {
  if (!req.body.text) {
    res.status(400).json({ errorMessage: 'Please provide text for the note' });
  } else {
    const newNote = new Notes(req.body);

    newNote
      .save()
      .then(newNote => {
        res.status(201).json(newNote);
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: 'There was an error saving the note'
        });
      });
  }
});

// Update a note by Id
router.route('/:id').put((req, res) => {
  const { id } = req.params;
  const update = req.body;

  if (!update.text) {
    res.status(400).json({ errorMessage: 'Please provide text for the note' });
  } else {
    const query = Notes.findByIdAndUpdate(id, update);

    query
      .then(note => {
        if (!note) {
          res.status(404).json({
            message: 'Note does not exist'
          });
        } else {
          res.status(200).json(note);
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ errorMessage: 'The note could not be modified' });
      });
  }
});

// Delete a note by Id
router.route('/:id').delete((req, res) => {
  const { id } = req.params;
  const query = Notes.findByIdAndRemove(id)
    .then(note => {
      if (!note) {
        res.status(400).json({ message: 'Note does not exist' });
      }
      res.status(204).json({ message: 'Note successfully deleted' });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'The note could not be removed' });
    });
});

module.exports = router;
