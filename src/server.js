// import dotenv and run configuration
require('dotenv').config();
const Hapi = require('@hapi/hapi');
// const routes = require('./routes');
const notes = require('./api/notes');
const NotesService = require('./services/inMemory/NotesService');
const NotesValidator = require('./validator/notes');

const init = async () => {
  // initiate NotesService for logic to use in plugin
  const notesService = new NotesService();

  const server = Hapi.server({
    port: process.env.HOST,
    host: process.env.PORT,
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
      validator: NotesValidator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
