exports.up = function(knex) {
    return knex.schema.createTable('products', table => {
      table.increments('id');
      table.string('name').notNullable();
      table.text('description');
      table.decimal('price', 10, 2).notNullable();
      table.integer('category_id').references('id').inTable('categories').onDelete('SET NULL');
      table.integer('stock').defaultTo(0);
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('products');
  };
  