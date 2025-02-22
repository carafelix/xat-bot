export default {
    name: 'say', // Command name

    /**
     * Executes the command.
     * @param {Bot} bot - Bot instance
     * @param {string} xatID - User ID
     * @param {string} message - Message
     * @param {string} from - Source (main, pc, pm)
    */
    async execute (bot, xatID, message, from) {
        if (!bot.hasPermission(xatID, from)) return;

        await bot.sendMessage(message);
    }
}