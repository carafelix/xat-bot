export default {
    name: 'info', // Command name

    /**
     * Executes the command.
     * @param {Bot} bot - Bot instance
     * @param {string} xatID - User ID
     * @param {string} message - Message
     * @param {string} from - Source (main, pc, pm)
    */
    async execute(bot, xatID, message, from) {
        await bot.reply('This bot was created by Paulo (281199).', xatID, from);
    }
}