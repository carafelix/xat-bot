import { parseUser } from "../utils/helpers.js";

export default {
    name: "u", // Packet name

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
            username: packet.N || null,
        });

        // Fetch necessary values
        if (bot.settings.welcome_msg && bot.settings.welcome_msg != "off") {
            const welcomeMessage = bot.settings.welcome_msg
                .replace("{chatname}", bot.chatInfo.name)
                .replace("{chatid}", bot.chatInfo.id)
                .replace("{user}", packet.N || "Unregistered")
                .replace("{name}", packet.n.split("##")[0].replace(/\([^()]*\)/g, ""))
                .replace("{uid}", userId);

            // Send message via PM/PC
            await bot.reply(welcomeMessage, userId, bot.settings.welcome_type);
        }
    },
};