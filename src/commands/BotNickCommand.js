import { getBotNick, setBotNick } from "../Settings/BotSettings.js";

export default {
  name: "nick", // Command name

  /**
   * Executes the command.
   * @param {Bot} bot - Bot instance
   * @param {string} xatID - User ID
   * @param {string} message - Message
   * @param {string} from - Source (main, pc, pm)
   */
  async execute(bot, xatID, message, from) {
    if (!bot.hasPermission(xatID, from)) return;
    if (!message) {
      return getBotNick().then((nick) => {
        bot.reply(
          `The current nick is: *${nick}*. To change it, use !nick <new_nick>`,
          xatID,
          from
        );
      });
    }

    try {
      await setBotNick(message);
      bot.restart();
      bot.reply(`Nick updated to: ${message}`, xatID, from);
    } catch (error) {
      bot.reply("An error occurred while updating the Nick.", xatID, from);
    }
  },
};
