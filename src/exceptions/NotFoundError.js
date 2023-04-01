const ClientError = require('./ClientError');
// inherit from client error
// using 404 not found response
class NotFoundError extends ClientError {
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}
module.exports = NotFoundError;
