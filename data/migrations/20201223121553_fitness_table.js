
exports.up = function(knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments();
            tbl.string('email', 128).notNullable().unique();
            tbl.string('password', 128).notNullable();
            tbl.integer('role')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('roles')
                .onUpdate('RESTRICT')
                .onDelete('RESTRICT')
        })
        .createTable('roles', tbl => {
            tbl.increments();
            tbl.string('role', 128).unique().notNullable
            ();
        })
        .createTable('classes', tbl => {
            tbl.increments();
            tbl.string('name', 128).notNullable().unique();
            tbl.string('type', 128).notNullable();
            tbl.string('start time', 128).notNullable();
            tbl.string('duration', 128).notNullable();
            tbl.string('intensity level', 128).notNullable();
            tbl.string('location', 128).notNullable();
            tbl.string('registered attendees', 128).notNullable();
            tbl.string('max class size', 128).notNullable();
        })

};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('roles')
        .dropTableIfExists('classes');
};
