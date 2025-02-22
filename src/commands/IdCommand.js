export default {
    name: 'id',

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
                'Usage: !id [xat username]',
                xatID,
                from
            );
        }

        const json = await bot.xatBlogAPI.regToId(message);
        const xatid = json.xatid ? parseInt(json.xatid) : 0;

        if (xatid < 7) {
            return await bot.reply(
                'User not found.',
                xatID,
                from
            );
        }

        await bot.reply(
            `ID for ${message} is: ${xatid}`,
            xatID,
            from
        );
    }
}