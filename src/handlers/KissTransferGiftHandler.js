export default {
    name: 'a', // Packet name

    /**
     * Kisses, gifts and transfers
     * @param {object} bot - Bot instance
     * @param {object} packet - Packet data
    */
    async execute (bot, packet) {
        if (packet.k === 'T') {
            await bot.bot.relogin();
        }
    }
}