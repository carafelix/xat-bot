import { getHome, setHome } from "../Settings/BotSettings.js";

export default {
  name: "home", // Command name

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
      return getHome().then((home) => {
        if (!home) {
          bot.reply(
            `My home is currently empty. To update it, use *!home edit [home]*.`,
            xatID,
            from
          );
        } else {
          bot.reply(
            `My current home is: *${home}*. To update it, use *!home edit [home]* or *!home clear*.`,
            xatID,
            from
          );
        }
      });
    }

    const command = message.split(" ")[0].toLowerCase();
    const homeMessage = message.slice(command.length).trim();

    switch (command) {
      case "edit":
        if (!homeMessage) {
          return bot.reply(
            "Please provide a valid message to set as your home.",
            xatID,
            from
          );
        }

        try {
          await setHome(homeMessage);
          bot.reply(`Home updated to: ${homeMessage}`, xatID, from);
        } catch (error) {
          bot.reply("An error occurred while updating the home.", xatID, from);
        }
        break;

      case "clear":
        try {
          await setHome("");
          bot.reply("Home cleared.", xatID, from);
        } catch (error) {
          bot.reply("An error occurred while clearing the home.", xatID, from);
        }
        break;

      default:
        bot.reply(
          "Invalid command. Use *!home edit [home]* to update or *!home clear* to remove the home.",
          xatID,
          from
        );
        break;
    }
  },
};
