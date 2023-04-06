const UsersHandler = require('./handler');
const routes = require('./routes');
// make plugin
module.exports = {
  name: 'users',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    // initiate class handler as notesHandler object with service parameter for logic in handler
    const usersHandler = new UsersHandler(service, validator);
    // function routes using object from notesHandler
    server.route(routes(usersHandler));
  },
};
