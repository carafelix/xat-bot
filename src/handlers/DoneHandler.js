export default {
    name: 'done', // Packet name

    /**
     * Connected to chat
     * @param {object} bot - Bot instance
     * @param {object} packet - Packet data
    */
    async execute(bot, packet) {
        bot.isConnected = true;
    }
}