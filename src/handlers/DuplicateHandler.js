export default {
    name: 'dup', // Packet name

    /**
     * Duplicate connection
     * @param {object} bot - Bot instance
     * @param {object} packet - Packet data
    */
    async execute(bot, packet) {
        bot.logger.error('DUP');
    }
}