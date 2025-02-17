import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export class PacketHandler {
    constructor(bot) {
        this.bot = bot;
        this.handlers = new Map();
        this.handlersPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'handlers');
    }

    async init() {
        const files = fs.readdirSync(this.handlersPath).filter(file => file.endsWith('.js'));
        
        for (const file of files) {
            const handler = await import(`file://${path.join(this.handlersPath, file)}`);
            if (handler.default?.name && handler.default?.execute) {
                this.handlers.set(handler.default.name, handler.default);
            }
        }
    }

    async handle(type, packet) {
        const handler = type.toLowerCase();
        
        if (this.handlers.has(handler)) {
            await this.handlers.get(handler).execute(this.bot, packet);
        }
    }
}