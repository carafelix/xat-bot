import { writeFile } from 'fs/promises';

export default {
    name: 'v', // Packet name

    /**
     * Login, relogin and errors
     * @param {object} bot - Bot instance
     * @param {object} packet - Packet data
    */
    async execute (bot, packet) {
        if (packet.e) {
            if ([21, 36].includes(parseInt(packet.e))) {
                return await bot.connect();
            }

            bot.logger.error(`Login error: ${packet.e}. Please try again.`);

            await writeFile('./cache/login.json', '{}'); // Clear login info

            return;
        }

        if (packet.n) {
            await writeFile('./cache/login.json', JSON.stringify(packet)); // Save login info

            bot.loginInfo = packet;

            if (bot.isLoggingIn) {
                bot.isLoggingIn = false;
                bot.restart();
            }
        }
    }
}