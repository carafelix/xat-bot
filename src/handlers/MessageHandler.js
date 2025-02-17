import { parseUser } from '../utils/helpers.js';

export default {
    name: 'm', // Packet name

    /**
     * Messages
     * @param {object} bot - Bot instance
     * @param {object} packet - Packet data
    */
    async execute(bot, packet) {
        if ((packet.s === '1') || packet.t[0] === '/') return;

        if (packet.t[0] === bot.settings.commandChar) {
            await bot.commandHandler.handle(
                packet.t,
                parseUser(packet.u),
                'main'
            );
        }
    }
}