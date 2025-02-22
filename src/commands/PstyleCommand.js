export default {
    name: "pstyle", // Command name

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
                `The current pstyle is: ${bot.settings.pstyle_image || "Not set"}`,
                xatID,
                from
            );
        }

        await bot.updateDb({ pstyle_image: message });

        await bot.reply(
            `Pstyle updated to: ${message}`,
            xatID,
            from
        );

        await bot.restart();
    },
};
