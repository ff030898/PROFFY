import Knex from "knex";

//CRIAR A TABELA
export async function up(knex: Knex) {
  return knex.schema.createTable("class_schedule", (table) => {
    table.increments("id").primary();
    table.integer("week_day").notNullable();
    table.integer("from").notNullable();
    table.integer("to").notNullable();

    table
      .integer("class_id")
      .notNullable()
      .references("id")
      .inTable("classes")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
}

//DELETAR A TABELA OU VOLTAR ATRÁS
export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("class_schedule");
}
