import Knex from "knex";

//CRIAR A TABELA
export async function up(knex: Knex) {
  return knex.schema.createTable("classes", (table) => {
    table.increments("id").primary();
    table.string("subject").notNullable();
    table.decimal("cost").notNullable();

    table
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
}

//DELETAR A TABELA OU VOLTAR ATRÁS
export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("classes");
}
