const express = require('express');
const router = express.Router();

const Notes = require('./notesModel');

router.route("/").get((req, res) => {
	const query = Notes.find();

	query
		.then(notes => {
			res.status(200).json(notes);
		})
		.catch(err => {
			res.status(500).json({ errorMessage: "Notes could not be retrieved" });
		});
});

router.route("/:id").get((req, res) => {
	const { id } = req.params;
	const query = Notes.findById(id);

	query
		.then(note => {
			if (!note) {
				res.status(404).json({ message: "Note does not exist" });
			}
			res.status(200).json(note);
		})
		.catch(err => {
			res.status(500).json({ errorMessage: "Note could not be retrieved" });
		});
});

module.exports = router;