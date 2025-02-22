import { getStatus, setStatus } from "../Settings/BotSettings.js";

export default {
  name: "status", // Command name

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
      return getStatus().then((status) => {
        if (!status) {
          bot.reply(
            `Your status is currently empty. To update it, use *!status edit [status]*.`,
            xatID,
            from
          );
        } else {
          bot.reply(
            `The current status is: *${status}*. To update it, use *!status edit [status]* or *!status clear*.`,
            xatID,
            from
          );
        }
      });
    }

    const command = message.split(" ")[0].toLowerCase();
    const statusMessage = message.slice(command.length).trim();

    switch (command) {
      case "edit":
        if (!statusMessage) {
          return bot.reply(
            "Please provide a message to set as your status.",
            xatID,
            from
          );
        }

        try {
          await setStatus(statusMessage);
          bot.restart();
          setTimeout(() => {
            bot.reply(`Status updated to: ${statusMessage}`, xatID, from);
          }, 2000);
        } catch (error) {
          bot.reply(
            "An error occurred while updating the status.",
            xatID,
            from
          );
        }
        break;

      case "clear":
        try {
          await setStatus("");
          bot.restart();
          setTimeout(() => {
            bot.reply("Status cleared.", xatID, from);
          }, 2000);
        } catch (error) {
          bot.reply(
            "An error occurred while clearing the status.",
            xatID,
            from
          );
        }
        break;

      default:
        bot.reply(
          "Invalid command. Use *!status edit [message]* to update or *!status clear* to remove the status.",
          xatID,
          from
        );
        break;
    }
  },
};
