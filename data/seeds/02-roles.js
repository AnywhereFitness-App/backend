
exports.seed = function(knex) {
  return knex('roles').insert([
    {id: 1, role: 'client'},
    {id: 2, role: 'instructor'},
  ]);
};
