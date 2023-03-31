const { NotePayloadSchema } = require('./schema');

const NotesValidator = {
  validateNotePayload: (payload) => {
    const validationResult = NotePayloadSchema.validate(payload);
    if (validationResult) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = NotesValidator;
