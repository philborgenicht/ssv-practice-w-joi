
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments()
    table.string('first_name').notNullable().defaultTo('')
    table.string('last_name').notNullable().defaultTo('')
    table.string('email').notNullable().defaultTo('')
    table.string('password').notNullable().defaultTo('')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}
