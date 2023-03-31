const NotesHandler = require('./handler');
const routes = require('./routes');
// make plugin
module.exports = {
  name: 'notes',
  version: '1.0.0',
  register: async (server, { service }) => {
    // initiate class handler as notesHandler object with service parameter for logic in handler
    const notesHandler = new NotesHandler(service);
    // function routes using object from notesHandler
    server.route(routes(notesHandler));
  },
};
