export default {
    name: "welcometype", // Command name

    /**
     * Executes the command.
     * @param {Bot} bot - Bot instance
     * @param {string} xatID - User ID
     * @param {string} message - Message
     * @param {string} from - Source (main, pc, pm)
     */
    async execute(bot, xatID, message, from) {
        if (!bot.hasPermission(xatID, from)) return;

        if (!message) {
            return await bot.reply(
                `The current welcome type is: *${bot.settings.welcome_type.toUpperCase()}*. To change, use *!welcome PC* or *!welcome PM*.`,
                xatID,
                from
            );
        }

        const normalizedMessage = message.trim().toLowerCase();
        if (!["pc", "pm"].includes(normalizedMessage)) {
            return await bot.reply(
                "Invalid command! Use *!welcome PC* or *!welcome PM*.", 
                xatID, 
                from
            );
        }

        await bot.updateDb({ welcome_type: normalizedMessage });

        await bot.reply(
            `Welcome message type updated to: *${normalizedMessage.toUpperCase()}*`, 
            xatID, 
            from
        );
    },
};
