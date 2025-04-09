import { parseUser } from '../utils/helpers.js'
import { exec } from 'node:child_process'

const BOT_TOKEN = process.env.TG_BOT_TOKEN
const CHAT_ID = process.env.TG_CHAT_ID

export default {
    name: 'm', // Packet name

    /**
     * Messages
     * @param {object} bot - Bot instance
     * @param {object} packet - Packet data
     */
    async execute(bot, packet) {
        if (packet.s === '1' || packet.t[0] === '/') return

        const uid = parseUser(packet.u)
        const user =
            bot.users
                .get(uid)
                ?.name?.split('##')[0]
                ?.replace(/\([^()]*\)/g, '') || 'UNKNOWN'
        const txt = user.trim() + ': ' + packet.t

        try {
            exec(
                `curl -X POST https://api.telegram.org/bot7686568013:AAHxgT7xMFyMRpUQR3I-3pQ2LGWuR2a_cFw/sendMessage -d chat_id=@xatrelive -d text="${txt}"`
            )
        } catch (error) {
            console.log(error)
        }
    },
}
