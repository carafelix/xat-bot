import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    logging: false,
    dialect: "sqlite",
    storage: "./database.db"
});