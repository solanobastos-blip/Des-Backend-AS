/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex('usuarios').del();

  await knex('usuarios').insert([
    {
      'nome': 'Administrador',
      'email': 'admin@email.com',
      'senha': '123456'
    },
    {
      'nome': 'João',
      'email': 'joao@email.com',
      'senha': '123456'
    }
  ]);
};