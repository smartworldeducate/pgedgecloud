exports.up = function(knex) {
    return knex.schema.table('products', function(table) {
      table.string('image');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('products', function(table) {
      table.dropColumn('image');
    });
  };
  