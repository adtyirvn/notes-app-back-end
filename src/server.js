const Hapi = require('@hapi/hapi');
// const routes = require('./routes');
const notes = require('./api/notes');
const NotesService = require('./services/inMemory/NotesService');

const init = async () => {
  // initiate NotesService for logic to use in plugin
  const notesService = new NotesService();

  const server = Hapi.server({
    port: 8000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        // cors
        origin: ['*'],
      },
    },
  });

  // server.route(routes);
  await server.register({
    plugin: notes,
    // options for passing data ex: object initiate from NotesService.js
    options: {
      service: notesService,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
