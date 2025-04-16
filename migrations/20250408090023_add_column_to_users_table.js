exports.up = function(knex) {
    return knex.schema.table('users', function(table) {
      table.string('phone_number').nullable();  // Adds a new nullable column
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('users', function(table) {
      table.dropColumn('phone_number');  // Removes the column in the rollback
    });
  };
  