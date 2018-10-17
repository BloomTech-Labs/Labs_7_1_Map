const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectIdSchema = Schema.ObjectId;

const NoteSchema = new Schema({
    text: string,
    user: {
        type: ObjectIdSchema,
        ref: 'User'
    }
    },
    {timestamps: true}
);

module.exports = mongoose.model('Note', NoteSchema); 