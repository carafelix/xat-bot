export default {
    name: "pcback", // Command name

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
                bot.settings.pcback
                    ? `The current pcback is: *${bot.settings.pcback}*. To update it, send *!pcback [url]*. To clear, send *!pcback clear*.`
                    : `Your pcback is currently empty. To update it, send *!pcback [message]*.`,
                xatID,
                from
            );
        }

        if (message.trim().toLowerCase() === "clear") {
            await bot.updateDb({ pcback: "" });

            await bot.reply(
                "Pcback cleared.",
                xatID,
                from
            );

            await bot.restart();

            return;
        }

        await bot.updateDb({ pcback: message });

        await bot.reply(
            `Pcback updated to: *${message}*`,
            xatID,
            from
        );

        await bot.restart();
    },
};
