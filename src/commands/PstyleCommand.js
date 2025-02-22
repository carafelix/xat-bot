import { getPstyle, setPstyle } from "../Settings/BotSettings.js";

export default {
  name: "pstyle", // Command name

  /**
   * Executes the command.
   * @param {Bot} bot - Bot instance
   * @param {string} xatID - User ID
   * @param {string} message - Message
   * @param {string} from - Source (main, pc, pm)
   */
  async execute(bot, xatID, message, from) {
    if (!bot.hasPermission(xatID, from)) return;

    const validImageExtensions = [".png", ".jpg", ".jpeg", ".gif"];

    function isValidImageLink(url) {
      try {
        const parsedUrl = new URL(url);
        return validImageExtensions.some((ext) =>
          parsedUrl.pathname.toLowerCase().endsWith(ext)
        );
      } catch (e) {
        return false;
      }
    }

    if (!message) {
      try {
        const pstyle = await getPstyle();
        return bot.reply(
          `The current pstyle is: ${pstyle || "Not set"}`,
          xatID,
          from
        );
      } catch (error) {
        console.error("Error fetching pstyle:", error);
        return bot.reply("Error fetching pstyle.", xatID, from);
      }
    }

    if (isValidImageLink(message)) {
      try {
        await setPstyle(message);
        bot.restart();
        setTimeout(() => {
          bot.reply(`Pstyle updated to: ${message}`, xatID, from);
        }, 2000);
      } catch (error) {
        console.error("Error updating pstyle:", error);
        bot.reply("An error occurred while updating the pstyle.", xatID, from);
      }
      return;
    }

    return bot.reply(
      "Invalid pstyle! Please provide a valid image link (png, jpg, gif).",
      xatID,
      from
    );
  },
};
