exports.up = function(knex) {
    return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl.string('userName', 12).notNullable()
      tbl.string('password', 32).notNullable()
    })
  };
  
  exports.down = function(knex) {
      return knex.schema
      .dropTableIfExists('users')
  };