const InvariantError = require('../../exceptions/InvariantError');
const { UserPayloadSchema } = require('./schema');
// make object for validation if request payload pass schema
const UsersValidator = {
  validateUserPayload: (payload) => {
    const validationResult = UserPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UsersValidator;
