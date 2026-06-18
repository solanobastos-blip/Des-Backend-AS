const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    // Define o caminho onde o arquivo físico do banco será criado
    connection: {
      filename: path.resolve(__dirname, 'database.sqlite')
    },
    // Configura o caminho para a criação e execução das Migrations
    migrations: {
      directory: path.resolve(__dirname, 'migrations')
    },
    // Configura o caminho para a criação e execução dos Seeders
    seeds: {
      directory: path.resolve(__dirname, 'seeds')
    },
    // O SQLite não suporta valores default na inserção por padrão no Knex, isso evita avisos no console
    useNullAsDefault: true 
  }
};