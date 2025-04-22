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

        let avatar = bot.users.get(uid)?.avatar

        if(+avatar > 0){
            avatar = `https://www.xat.com/web_gear/chat/av/${avatar}.png`
        }
        

        try {
            exec(
                `curl -X POST https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto -d chat_id="${CHAT_ID}" -d photo="${avatar}" -d caption="${txt}"`
            )
        } catch (photoError) {
            bot.logger.error('Photo Error:', photoError)
            try {
                exec(
                    `curl -X POST https://api.telegram.org/bot${BOT_TOKEN}/sendMessage -d chat_id="${CHAT_ID}" -d -d txt="${txt}"`
                )
            } catch (msgError) {
                bot.logger.error('Message error:',msgError)
            }
        }
    },
}
