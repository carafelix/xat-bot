export default {
    name: 'ping', // Command name

    /**
     * Executes the command.
     * @param {Bot} bot - Bot instance
     * @param {string} xatID - User ID
     * @param {string} message - Message
     * @param {string} from - Source (main, pc, pm)
    */
    async execute (bot, xatID, message, from) {
        await bot.reply('Pong!', xatID, from);
    }
}