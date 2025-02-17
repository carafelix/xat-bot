import { parseUser } from '../utils/helpers.js';

export default {
    name: 'l', // Packet name

    /**
     * Someone left chat
     * @param {object} bot - Bot instance
     * @param {object} packet - Packet data
    */
    async execute(bot, packet) {
        const uid = parseUser(packet.u);
        if (uid >= 1900000000) return;

        // Remove user from cache
        bot.users.delete(uid);
    }
}