/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('palpites', function (table) {

        table.increments('id').primary();

        //chave estrangeira para a tabela de usuários, ele busca na outra tabela o id do usuário que fez o palpite
        table.integer('usuario_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('usuarios')
            .onDelete('CASCADE'); // Se o usuário for deletado, todos os palpites dele também serão deletados

        table.string('jogo').notNullable();
        table.integer('gols_a').notNullable();
        table.integer('gols_b').notNullable();
        table.date('data_jogo');
        table.decimal('dolar_no_dia', 10, 2); // delimitando a precisão para 10 dígitos no total, sendo 2 deles após o ponto decimal
        table.boolean('dia_de_feriado');
        table.timestamp('criado_em').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

};
