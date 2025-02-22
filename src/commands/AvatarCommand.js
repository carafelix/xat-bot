export default {
    name: "avatar", // Command name

    /**
     * Executes the command.
     * @param {Bot} bot - Bot instance
     * @param {string} xatID - User ID
     * @param {string} message - Message
     * @param {string} from - Source (main, pc, pm)
     */
    async execute (bot, xatID, message, from) {
        if (!bot.hasPermission(xatID, from)) return;

        if (!message) {
            return await bot.reply(
                `The current avatar is: ${bot.settings.avatar}`, 
                xatID, 
                from
            );
        }

        await bot.updateDb({ avatar: message });

        await bot.reply(
            `Avatar updated to: ${message}`, 
            xatID, 
            from
        );

        await bot.restart();
    },
};
