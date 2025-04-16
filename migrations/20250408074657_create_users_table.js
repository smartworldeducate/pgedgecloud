exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('email').unique().notNullable();
      table.timestamps(true, true); // adds created_at and updated_at
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  