import { parseUser } from '../utils/helpers.js'
import { Api } from 'grammy'
import { autoRetry } from '@grammyjs/auto-retry'

const BOT_TOKEN = process.env.TG_BOT_TOKEN
const CHAT_ID = process.env.TG_CHAT_ID
const api = new Api(BOT_TOKEN)
api.config.use(autoRetry())

const SPECIAL_CHARS = [
	'\\',
    '_',
    '*',
    '[',
    ']',
    '(',
    ')',
    '~',
    '`',
    '>',
    '<',
    '&',
    '#',
    '+',
    '-',
    '=',
    '|',
    '{',
    '}',
    '.',
    '!',
]

function escapeMarkdown(text) {
    SPECIAL_CHARS.forEach(
        (char) =>
            (text = text.replaceAll(char, `\\${char}`))
    )
    return text
}

export default {
    name: 'm', // Packet name

    /**
     * Messages
     * @param {object} bot - Bot instance
     * @param {object} packet - Packet data
     */
    async execute(bot, packet) {
        if (packet.s === '1' || packet.t[0] === '/' || packet.t.split(' ').length < 3) return

        const uid = parseUser(packet.u)
        if (uid == 1510151) return;
      
        let user =
            bot.users
                .get(uid)
                ?.name?.split('##')[0];

        if(!/^\([^()]*\)$/.test(user)){
                user = user?.replace(/\([^()]*\)/g, '')
        }
                user = user?.replaceAll(/\s/g, '')?.trim()  || 'UNKNOWN'

        let txt = escapeMarkdown(user + ': ' + packet.t)


        const quoteRegex = /(❯.+\])(.{0,})/m

        const match = txt.match(quoteRegex)

        if (match) {
            txt = txt.replace(match[1], '')
            if(txt.split(' ').length < 4) return;
            const first = match[1].indexOf('[') + 1
            const last = match[1].lastIndexOf(']') - 1
            
            txt = '>' + match[1].slice(first,last).trim() + '\n' + txt 
        }
        
        try {
            api.sendMessage(CHAT_ID, txt, {
                parse_mode: 'MarkdownV2',
                link_preview_options: {
                    prefer_small_media: true,
                },
            })
        } catch (error) {
            bot.logger.error(error)
        }
    },
}
