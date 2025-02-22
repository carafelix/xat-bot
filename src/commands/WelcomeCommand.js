import {
  getEnableWelcomeMessage,
  setEnableWelcomeMessage,
} from "../Settings/BotSettings.js";

export default {
  name: "welcome", // Command name

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
      return getEnableWelcomeMessage().then((status) => {
        bot.reply(
          `The welcome message is currently: ${
            status
              ? "*enabled*, To enable or disable it, use !welcome on/off."
              : "*disabled*, To enable or disable it, use !welcome on/off."
          }`,
          xatID,
          from
        );
      });
    }

    const normalizedMessage = message.toLowerCase();

    if (normalizedMessage !== "on" && normalizedMessage !== "off") {
      return bot.reply("Invalid command! Use *!welcome on/off*.", xatID, from);
    }

    try {
      await setEnableWelcomeMessage(normalizedMessage === "on" ? 1 : 0);
      bot.reply(
        `Welcome message updated to: ${normalizedMessage}`,
        xatID,
        from
      );
    } catch (error) {
      bot.reply(
        "An error occurred while updating the welcome message setting.",
        xatID,
        from
      );
    }
  },
};
