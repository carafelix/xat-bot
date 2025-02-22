export default {
    name: "commands", // Command name

    /**
     * Executes the command.
     * @param {Bot} bot - Bot instance
     * @param {string} xatID - User ID
     * @param {string} message - Message
     * @param {string} from - Source (main, pc, pm)
     */
    async execute (bot, xatID, from) {
        const commands = Array.from(bot.commands.keys())
            .map(name => name.charAt(0).toUpperCase() + name.slice(1))
            .join(', ');

        await bot.reply(
            `Available commands are: ${commands}`, 
            xatID, 
            from
        );
    },
};
