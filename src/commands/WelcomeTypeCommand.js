import { getWelcomeType, setWelcomeType } from "../Settings/BotSettings.js";

export default {
  name: "welcometype", // Command name

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
      return getWelcomeType().then((status) => {
        bot.reply(
          `The welcome type message is currently: ${
            status === "pc"
              ? "*PC*, To change, use !welcome PC/PM."
              : "*PM*, To change, use !welcome PC/PM."
          }`,
          xatID,
          from
        );
      });
    }

    const normalizedMessage = message.toLowerCase();

    if (normalizedMessage !== "pc" && normalizedMessage !== "pm") {
      return bot.reply("Invalid command! Use *!welcome PC/PM*.", xatID, from);
    }

    try {
      await setWelcomeType(normalizedMessage);
      bot.reply(
        `Welcome message type updated to: ${normalizedMessage.toUpperCase()}`,
        xatID,
        from
      );
    } catch (error) {
      console.error("Error updating welcome message type:", error);
      bot.reply(
        "An error occurred while updating the welcome message type.",
        xatID,
        from
      );
    }
  },
};
