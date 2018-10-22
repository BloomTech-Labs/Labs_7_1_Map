const express = require('express');
const router = express.Router();

const Notes = require('./notesModel');

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

module.exports = router;
