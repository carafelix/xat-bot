import { getChar, setChar } from "../Settings/BotSettings.js";

export default {
  name: "char", // Command name

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
      return await getChar().then((Char) => {
        bot.reply(`The current Char is: ${Char}`, xatID, from);
      });
    }

    try {
      await setChar(message);
      bot.reply(`Char updated to: ${message}`, xatID, from);
    } catch (error) {
      console.log(error);
      bot.reply("An error occurred while updating the Char.", xatID, from);
    }
  },
};
