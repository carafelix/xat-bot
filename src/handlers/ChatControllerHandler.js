export default {
    name: 'c', // Packet name

    /**
     * Chat controller (bans, kicks, etc)
     * @param {object} bot - Bot instance
     * @param {object} packet - Packet data
    */
    async execute(bot, packet) {
        if (
            ['/u', '/k', '/g'].includes(packet.t?.substr(0, 2)) &&
            packet.d === bot.loginInfo.i
        ) {
            await bot.connect();
        }
    }
}