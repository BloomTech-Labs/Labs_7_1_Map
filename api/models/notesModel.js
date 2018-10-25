const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.Types.ObjectId;

const NoteSchema = new Schema(
  {
    text: String,
    user: {
      type: ObjectIdSchema,
      ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', NoteSchema);
