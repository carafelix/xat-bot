export default {
    name: "home", // Command name

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
                bot.settings.home
                    ? `The current home is: *${bot.settings.home}*. To update it, send *!home [message]*. To clear, send *!home clear*.`
                    : `Your home is currently empty. To update it, send *!home [message]*.`,
                xatID,
                from
            );
        }

        if (message.trim().toLowerCase() === "clear") {
            await bot.updateDb({ home: "" });

            await bot.reply(
                "Home cleared.",
                xatID,
                from
            );

            await bot.restart();

            return;
        }

        await bot.updateDb({ home: message });

        await bot.reply(
            `Home updated to: *${message}*`,
            xatID,
            from
        );

        await bot.restart();
    },
};
