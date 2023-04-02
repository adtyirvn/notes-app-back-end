// import dotenv and run configuration
require('dotenv').config();
const Hapi = require('@hapi/hapi');
// const routes = require('./routes');
const notes = require('./api/notes');
// const NotesService = require('./services/inMemory/NotesService');
const NotesService = require('./services/postgres/NotesService');
const NotesValidator = require('./validator/notes');
const ClientError = require('./exceptions/ClientError');

const init = async () => {
  // initiate NotesService for logic to use in plugin
  const notesService = new NotesService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
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

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }
      if (!response.isServer) {
        return h.continue;
      }
      const newResponse = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }
    return h.continue;
  });
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
