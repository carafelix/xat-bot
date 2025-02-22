export default {
    name: 'reg',

    /**
     * Executes the command.
     * @param {Bot} bot - Bot instance
     * @param {string} xatID - User ID
     * @param {string} message - Message
     * @param {string} from - Source (main, pc, pm)
    */
    async execute (bot, xatID, message, from) {
        if (!message) {
            return await bot.reply(
                'Usage: !reg [xat id]', 
                xatID, 
                from
            );
        }

        const json = await bot.xatBlogAPI.idToReg(message);
        if (!json.username) {
            return await bot.reply(
                'User not found.',
                xatID,
                from
            );
        }

        await bot.reply(
            `Regname for ${message} is: ${json.username}`,
            xatID,
            from
        );
    }
}