const knex = require('knex');
const knexfile = require('./knexfile');

// Inicializa a conexão com o banco utilizando as configurações de desenvolvimento
const connection = knex(knexfile.development);

module.exports = connection;