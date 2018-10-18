const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.Types.ObjectId;

const NoteSchema = new Schema(
  {
    text: string,
    user: {
      type: ObjectIdSchema,
      ref: 'User'
    }
  },
  { timestamps: true }
);

//to save a note
//note = new Note({text: 'some note', user: <the user id for user trying to save note>})
//note.saveNote()
NoteSchema.methods.saveNote = async () => {
  await this.save();
  const user = await User.find({ _id: this.user });
  user.notes.push(this._id);
  await user.save();
};
module.exports = mongoose.model('Note', NoteSchema);
