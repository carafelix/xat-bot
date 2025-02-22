import {
  getEnableWelcomeMessage,
  getWelcomeMessage,
  getWelcomeType,
} from "../Settings/BotSettings.js";
import { parseUser } from "../utils/helpers.js";

export default {
  name: "u", // Packet name

  /**
   * Someone joined chat
   * @param {object} bot - Bot instance
   * @param {object} packet - Packet data
   */
  async execute(bot, packet) {
    const userId = parseUser(packet.u);
    if (userId >= 1900000000) return;

    // Add user to cache
    bot.users.set(userId, {
      packet,
      name: packet.n,
      avatar: packet.a,
      homepage: packet.h,
      username: packet.N || null,
    });

    // Send welcome message
    async function checkWelcomeMessageStatus() {
      try {
        const status = await getEnableWelcomeMessage();
        const isEnabled = status === 1;
        return isEnabled;
      } catch (error) {
        console.error("Error fetching welcome message status:", error);
        return false;
      }
    }

    async function checkWelcomeMessage() {
      try {
        const welcomeMsg = await getWelcomeMessage();
        return welcomeMsg;
      } catch (error) {
        console.error("Error fetching welcome message:", error);
        return null;
      }
    }

    async function checkWelcomeType() {
      try {
        const welcomeType = await getWelcomeType();
        return welcomeType;
      } catch (error) {
        console.error("Error fetching welcome type:", error);
        return null;
      }
    }

    const welcome = await checkWelcomeMessageStatus().then((status) => {
      return status;
    });

    const welcomeMsg = await checkWelcomeMessage().then((msg) => {
      return msg;
    });

    const welcomeType = await checkWelcomeType().then((type) => {
      return type;
    });

    if (welcome === true) {
      if (welcomeMsg && bot.isConnected) {
        const welcomeMessage = welcomeMsg
          .replace("{chatname}", bot.chatInfo.g)
          .replace("{chatid}", bot.chatInfo.id)
          .replace("{user}", packet.N || "Unregistered")
          .replace("{name}", packet.n.split("##")[0].replace(/\([^()]*\)/g, ""))
          .replace("{uid}", userId);

        // Check if the message should be sent via PM or PC
        if (welcomeType === "pc") {
          await bot.sendPC(welcomeMessage, userId);
        } else {
          await bot.sendPM(welcomeMessage, userId);
        }
      }
    }
  },
};
