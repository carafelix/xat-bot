import { parseUser } from '../utils/helpers.js';

export default {
    name: 'u', // Packet name

    /**
     * Someone joined chat
     * @param {object} bot - Bot instance
     * @param {object} packet - Packet data
    */
    async execute(bot, packet) {
        const userId = parseUser(packet.u);
        if (userId >= 1900000000) return;

        // Add user to cache
        bot.users.set(userId, {
            packet,
            name: packet.n,
            avatar: packet.a,
            homepage: packet.h,
            username: packet.N || null
        });

        // Send welcome message
        if (bot.settings.welcomeMsg && bot.isConnected) {
            const welcomeMsg = bot.settings.welcomeMsg
                .replace('{chatname}', bot.chatInfo.g)
                .replace('{chatid}', bot.chatInfo.id)
                .replace('{user}', packet.N || 'Unregistered')
                .replace('{name}', packet.n.split('##')[0].replace(/\([^()]*\)/g, ''))
                .replace('{uid}', userId);

            // PM is set by default...
            await bot.sendPM(welcomeMsg, userId);
        }
    }
}