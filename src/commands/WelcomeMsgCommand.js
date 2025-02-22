import {
  getWelcomeMessage,
  setWelcomeMessage,
} from "../Settings/BotSettings.js";

export default {
  name: "welcomemsg", // Command name

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
      return getWelcomeMessage().then((welcomeMsg) => {
        bot.reply(
          `The current welcome message is: ${welcomeMsg}, Options: {chatname} {chatid} {user} {name} {uid}.`,
          xatID,
          from
        );
      });
    }

    try {
      await setWelcomeMessage(message);
      bot.reply(`Welcome message updated to: ${message}`, xatID, from);
    } catch (error) {
      bot.reply(
        "An error occurred while updating the welcome message.",
        xatID,
        from
      );
    }
  },
};
