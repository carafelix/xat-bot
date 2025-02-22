export default {
  name: "commands", // Command name

  /**
   * Executes the command.
   * @param {Bot} bot - Bot instance
   * @param {string} xatID - User ID
   * @param {string} message - Message
   * @param {string} from - Source (main, pc, pm)
   */
  async execute(bot, xatID, from) {
    await bot.reply(bot.settings.commands_available, xatID, from);
  },
};
