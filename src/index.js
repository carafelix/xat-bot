import { config } from 'dotenv';
import { sequelize } from './core/Database.js';
import { Bot } from './core/Bot.js';

config();

const startApp = async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });

    new Bot();
};

startApp();
