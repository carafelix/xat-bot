import { writeFile } from 'fs/promises';

export default {
    name: 'logout', // Packet name

    /**
     * Got an error
     * @param {object} bot - Bot instance
     * @param {object} packet - Packet data
    */
    async execute(bot, packet) {
        const error = packet.e.toLowerCase();

        if (['e03', 'e16', 'f011', 'e43', 'e45'].includes(error)) {
            if (error === 'e45') {
                await bot.login();
            }
            return await bot.connect();
        }

        bot.logger.error(`xat Error: ${packet.e}. Please try again.`);

        await writeFile('./cache/login.json', '{}');
    }
}