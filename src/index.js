import { config } from 'dotenv';
import { sequelize } from './core/Database.js';
import { Bot } from './core/Bot.js';
import fs from 'fs'

fs.unlinkSync('./cache/login.json')


config();

const startApp = async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });

    new Bot();
};

startApp();
