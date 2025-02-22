import { getPcback, setPcback } from "../Settings/BotSettings.js";

export default {
  name: "pcback", // Command name

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
      return getPcback().then((pcback) => {
        if (!pcback || pcback === "default") {
          bot.reply(
            `No pcback has been set. To set one, use *!pcback edit [image_url]*.`,
            xatID,
            from
          );
        } else {
          bot.reply(
            `The current pcback is: *${pcback}*. To update it, use *!pcback edit [image_url]*.`,
            xatID,
            from
          );
        }
      });
    }

    const command = message.split(" ")[0].toLowerCase();
    const pcbackLink = message.slice(command.length).trim();

    switch (command) {
      case "edit":
        if (!pcbackLink) {
          return bot.reply(
            "Please provide a valid image/gif link to set as your pcback.",
            xatID,
            from
          );
        }

        const validImageExtensions = [".png", ".jpg", ".jpeg", ".gif"];

        function isValidImageLink(url) {
          try {
            const parsedUrl = new URL(url);
            return validImageExtensions.some((ext) =>
              parsedUrl.pathname.endsWith(ext)
            );
          } catch (e) {
            return false;
          }
        }

        if (!isValidImageLink(pcbackLink)) {
          return bot.reply(
            "Invalid pcback! Please provide a valid image/gif link (png, jpg, gif).",
            xatID,
            from
          );
        }

        try {
          await setPcback(pcbackLink);
          bot.restart();
          setTimeout(() => {
            bot.reply(`Pcback updated to: ${pcbackLink}`, xatID, from);
          }, 2000);
        } catch (error) {
          console.log(error);
          bot.reply(
            "An error occurred while updating the pcback.",
            xatID,
            from
          );
        }
        break;

      case "clear":
        try {
          await setPcback("");
          bot.restart();
          setTimeout(() => {
            bot.reply("Pcback removed.", xatID, from);
          }, 2000);
        } catch (error) {
          bot.reply(
            "An error occurred while clearing the pcback.",
            xatID,
            from
          );
        }
        break;

      default:
        bot.reply(
          "To set your pcback, use *!pcback edit [image_url]*. To clear it, use *!pcback clear*.",
          xatID,
          from
        );
        break;
    }
  },
};
