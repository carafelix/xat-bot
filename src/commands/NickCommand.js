export default {
    name: "nick", // Command name

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
                `The current nick is: *${nick}*. To change it, use !nick [new nick]`,
                xatID,
                from
            );
        }

        await bot.updateDb({ nick: message });

        await bot.reply(`Nick updated to: ${message}`, xatID, from);

        await bot.restart();
    },
};
