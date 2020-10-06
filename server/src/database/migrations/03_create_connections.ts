import Knex from "knex";

//CRIAR A TABELA
export async function up(knex: Knex) {
  return knex.schema.createTable("connections", (table) => {
    table.increments("id").primary();

    table
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table.timestamp("created_at").defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();
  });
}

//DELETAR A TABELA OU VOLTAR ATRÁS
export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("connections");
}
