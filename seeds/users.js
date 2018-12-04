
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {first_name: 'Ben', last_name: 'Broad', email: 'ben@galvanize.com', password: '12345'},
        {first_name: 'Teddi', last_name: 'Maull', email: 'teddi@galvanize.com', password: '67890'},
        {first_name: 'Brian', last_name: 'Kracha', email: 'brian@galvanize.com', password: '12345'}
      ])
      .then(() => {
        return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
      })
    })
}
