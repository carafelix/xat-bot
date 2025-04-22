import { parseUser } from '../utils/helpers.js'
import { Api } from 'grammy'
import { autoRetry } from "@grammyjs/auto-retry";

const BOT_TOKEN = process.env.TG_BOT_TOKEN
const CHAT_ID = process.env.TG_CHAT_ID
const api = new Api(BOT_TOKEN)
api.config.use(autoRetry())


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
        let txt = user.trim() + ': ' + packet.t

        const quoteRegex = /❯#([^\[\]\s]+)\[([^\]]+)\]/m
        const match = txt.match(quoteRegex)

        if (match) {
            txt = txt.replace(match[0], '')
            txt = `>${match[2]}\n` + txt
        }
        try {
            api.sendMessage(CHAT_ID, txt, {
                parse_mode: match
                    ? 'MarkdownV2'
                    : undefined,
                link_preview_options: {
                    prefer_small_media: true,
                },
            })
        } catch (error) {
            bot.logger.error(error)
        }
    },
}
