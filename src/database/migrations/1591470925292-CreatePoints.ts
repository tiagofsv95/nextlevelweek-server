import Knex from 'knex';
import { uuidGenerationRaw } from '../generateUUID';

export async function up(knex: Knex) {
    return knex.schema.createTable('points', table => {
        table.uuid('id').primary().defaultTo(knex.raw(uuidGenerationRaw));
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('points');
}

