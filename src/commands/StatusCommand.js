export default {
    name: "status", // Command name

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
                bot.settings.status
                    ? `The current status is: *${bot.settings.status}*. To update it, send *!status [message]*. To clear, send *!status clear*.`
                    : `Your status is currently empty. To update it, send *!status [message]*.`,
                xatID,
                from
            );
        }

        if (message.trim().toLowerCase() === "clear") {
            await bot.updateDb({ status: "" });

            await bot.reply(
                "Status cleared.",
                xatID,
                from
            );

            await bot.restart();

            return;
        }

        await bot.updateDb({ status: message });

        await bot.reply(
            `Status updated to: *${message}*`,
            xatID,
            from
        );

        await bot.restart();
    },
};
