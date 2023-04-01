const InvariantError = require('../../exceptions/InvariantError');
const { NotePayloadSchema } = require('./schema');
// make object for validation if request payload pass schema
const NotesValidator = {
  validateNotePayload: (payload) => {
    const validationResult = NotePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = NotesValidator;
