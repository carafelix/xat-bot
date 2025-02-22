import { getStealth, setStealth } from "../Settings/BotSettings.js";

export default {
  name: "stealth", // Command name

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
      return getStealth().then((status) => {
        bot.reply(
          `Stealth mode is currently: ${
            status === "enable"
              ? "*enabled*, To enable or disable it, use !stealth on/off."
              : "*disabled*, To enable or disable it, use !stealth on/off."
          }`,
          xatID,
          from
        );
      });
    }

    const normalizedMessage = message.toLowerCase();

    if (normalizedMessage !== "on" && normalizedMessage !== "off") {
      return bot.reply("Invalid command! Use *!stealth on/off*.", xatID, from);
    }

    try {
      await setStealth(normalizedMessage);
      bot.restart();
      setTimeout(() => {
        bot.reply(`Stealth mode updated to: ${normalizedMessage}`, xatID, from);
      }, 2000);
    } catch (error) {
      bot.reply(
        "An error occurred while updating the stealth mode setting.",
        xatID,
        from
      );
    }
  },
};
