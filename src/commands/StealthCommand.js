export default {
    name: "stealth", // Command name

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
                `Stealth mode is currently: ${bot.settings.stealth === "enable"
                    ? "*enabled*, To enable or disable it, use !stealth on/off."
                    : "*disabled*, To enable or disable it, use !stealth on/off."
                }`,
                xatID,
                from
            );
        }

        const normalizedMessage = message.toLowerCase();
        if (!["off", "on"].includes(normalizedMessage)) {
            return await bot.reply(
                "Invalid command! Use *!stealth on/off*.",
                xatID,
                from
            );
        }

        await bot.updateDb({ stealth: normalizedMessage });

        await bot.reply(
            `Stealth mode updated to: ${normalizedMessage}`,
            xatID,
            from
        );

        await bot.restart();
    },
};
