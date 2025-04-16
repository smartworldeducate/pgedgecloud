exports.up = function(knex) {
    return knex.schema.table('orders', function(table) {
      table.integer('product_id'); // Add product_id column
      table.integer('category_id'); // Add category_id column
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('orders', function(table) {
      table.dropColumn('product_id'); // Remove product_id column
      table.dropColumn('category_id'); // Remove category_id column
    });
  };
  