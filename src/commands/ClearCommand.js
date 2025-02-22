export default {
    name: "clear", // Command name

    /**
     * Executes the command.
     * @param {Bot} bot - Bot instance
     * @param {string} xatID - User ID
     * @param {string} message - Message
     * @param {string} from - Source (main, pc, pm)
     */
    async execute (bot, xatID, message, from) {
        if (!bot.hasPermission(xatID, from)) return;

        for (let i = 0; i <= 25; i++) {
            await bot.sendMessage("/d");
        }

        await bot.reply(
            "Chat cleared!",
            xatID,
            from
        );
    },
};
