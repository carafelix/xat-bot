export default {
    name: 'idle', // Packet name

    /**
     * Disconnected due to inactivity
     * @param {object} bot - Bot instance
     * @param {object} packet - Packet data
    */
    async execute(bot, packet) {
        await bot.connect();
    }
}