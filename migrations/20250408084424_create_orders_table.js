exports.up = function(knex) {
    return knex.schema.createTable('orders', table => {
      table.increments('id');
      table.string('order_number').unique().notNullable();
      table.date('order_date').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('orders');
  };
  