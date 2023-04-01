const ClientError = require('./ClientError');
// custom error inherit from client error
// using 400 bad request response
class InvariantError extends ClientError {
  constructor(message) {
    super(message);
    this.name = 'InvariantError';
  }
}
module.exports = InvariantError;
