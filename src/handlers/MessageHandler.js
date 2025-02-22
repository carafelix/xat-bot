import { getChar } from "../Settings/BotSettings.js";
import { parseUser } from "../utils/helpers.js";

export default {
  name: "m", // Packet name

  /**
   * Messages
   * @param {object} bot - Bot instance
   * @param {object} packet - Packet data
   */
  async execute(bot, packet) {
    if (packet.s === "1" || packet.t[0] === "/") return;

    const charCode = await getChar();

    if (packet.t[0] === charCode) {
      await bot.commandHandler.handle(packet.t, parseUser(packet.u), "main");
    }
  },
};
