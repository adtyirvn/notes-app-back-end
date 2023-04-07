/* eslint-disable no-underscore-dangle */
const autoBind = require('auto-bind');

class NotesHandler {
  // parameter class using service in folder service ex: NotesServices.js
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    // using bind for this in each handler to glue this in initiate object from this class
    // this.postNoteHandler = this.postNoteHandler.bind(this);
    // this.getNotesHandler = this.getNotesHandler.bind(this);
    // this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    // this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    // this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
    autoBind(this);
  }

  // make handler for each route for request and response
  async postNoteHandler(request, h) {
    // validate request payload
    this._validator.validateNotePayload(request.payload);
    const { title = 'untitled', body, tags } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    // using logic from service
    const noteId = await this._service.addNote({
      title,
      body,
      tags,
      owner: credentialId,
    });

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId,
      },
    });
    response.code(201);
    return response;
  }

  async getNotesHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const notes = await this._service.getNotes(credentialId);
    return {
      status: 'success',
      data: {
        notes,
      },
    };
  }

  async getNoteByIdHandler(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._service.verifyNoteOwner(id, credentialId);
    const note = await this._service.getNoteById(id);
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  async putNoteByIdHandler(request) {
    // try {
    this._validator.validateNotePayload(request.payload);
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._service.verifyNoteOwner(id, credentialId);
    await this._service.editNoteById(id, request.payload);

    return {
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    };
  }

  async deleteNoteByIdHandler(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._service.verifyNoteOwner(id, credentialId);
    await this._service.deleteNoteById(id);
    return {
      status: 'success',
      message: 'Catatan berhasil dihapus',
    };
  }
}
module.exports = NotesHandler;
