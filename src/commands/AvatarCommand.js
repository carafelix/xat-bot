import { getAvatar, setAvatar } from "../Settings/BotSettings.js";

export default {
  name: "avatar", // Command name

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

    function isValidNumber(value) {
      const number = parseInt(value, 10);
      return (
        /^\d+$/.test(value) &&
        number >= 0 &&
        number <= 1758 &&
        value === String(number)
      );
    }

    function extractTextInParentheses(input) {
      const match = input.match(/\(([^)]+)\)/);
      return match ? match[0].trim() : null;
    }

    if (!message) {
      try {
        const avatar = await getAvatar();
        return bot.reply(
          `The current avatar is: ${avatar || "Not set"}`,
          xatID,
          from
        );
      } catch (error) {
        console.error("Error fetching avatar:", error);
        return bot.reply("Error fetching avatar.", xatID, from);
      }
    }

    let extractedText = extractTextInParentheses(message);

    if (extractedText) {
      try {
        await setAvatar(extractedText);
        bot.restart();
        setTimeout(() => {
          bot.reply(`Avatar updated to: ${extractedText}`, xatID, from);
        }, 2000);
      } catch (error) {
        console.error("Error updating avatar:", error);
        bot.reply("An error occurred while updating the avatar.", xatID, from);
      }
      return;
    }

    if (isValidNumber(message) || isValidImageLink(message)) {
      try {
        await setAvatar(message);
        bot.restart();
        setTimeout(() => {
          bot.reply(`Avatar updated to: ${message}`, xatID, from);
        }, 2000);
      } catch (error) {
        console.error("Error updating avatar:", error);
        bot.reply("An error occurred while updating the avatar.", xatID, from);
      }
      return;
    }

    return bot.reply(
      "Invalid avatar! Please provide a valid image link (png, jpg, gif), a number between 0 and 1758, or a smiley.",
      xatID,
      from
    );
  },
};
