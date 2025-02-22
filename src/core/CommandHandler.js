import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export class CommandHandler {
    constructor(bot) {
        this.bot = bot;
        this.commands = new Map();
        this.commandsPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'commands');
    }

    async init () {
        const files = fs.readdirSync(this.commandsPath).filter(file => file.endsWith('.js'));

        for (const file of files) {
            const command = await import(`file://${path.join(this.commandsPath, file)}`);
            if (command.default?.name && command.default?.execute) {
                this.commands.set(command.default.name, command.default);
            }
        }

        this.bot.commands = this.commands;
    }

    async handle (text, xatID, from = 'main') {
        const [cmd, ...args] = text.split(' ');
        const command = cmd.slice(1).toLowerCase();

        if (this.commands.has(command)) {
            await this.commands.get(command).execute(this.bot, xatID, args.join(' '), from);
        }
    }
}