import { WebSocket } from "ws";
import { createLogger, format, transports } from "winston";
import { promises as fs } from "fs";
import { XatBlogAPI } from "../api/XatBlogAPI.js";
import { xmlToArray, sanitize } from "../utils/helpers.js";
import { PacketHandler } from "./PacketHandler.js";
import { CommandHandler } from "./CommandHandler.js";

export class Bot {
  /**
   * Initializes the bot instance, handlers and WebSocket.
   */
  constructor() {
    this.setupLogger();

    this.xatBlogAPI = new XatBlogAPI();
    this.packetHandler = new PacketHandler(this);
    this.commandHandler = new CommandHandler(this);

    this.ws = null;
    this.isLoggingIn = false;
    this.isConnected = false;
    this.users = new Map();
    this.chatInfo = {};
    this.loginInfo = {};

    this.init();
  }

  /**
   * Initializes the bot, loads settings, logs in,
   * and connects to the chat server.
   */
  async init() {
    try {
      this.settings = {
        home: process.env.BOT_HOME,
        chat: process.env.BOT_CHAT,
        owners: JSON.parse(process.env.BOT_OWNERS),
        disabledPowers: JSON.parse(process.env.DISABLED_POWERS),
        statusfx_effect: process.env.STATUSFX_EFFECT,
        statusfx_speed: process.env.STATUSFX_SPEED,
        statusfx_status2: process.env.STATUSFX_STATUS2,
        statusfx_wave_frequency: process.env.STATUSFX_WAVE_FREQUENCY,
        pstyle: process.env.PSTYLE,
        pstyle_color: process.env.PSTYLE_COLOR,
        pstyle_icons: process.env.PSTYLE_ICONS,
        commands_available: process.env.COMMANDS,
      };

      await this.getChatInfo();

      this.loginInfo = {
        id: parseInt(process.env.BOT_ID || "2"),
        username: process.env.BOT_USER || "",
        apikey: process.env.BOT_APIKEY || "",
      };

      await this.packetHandler.init();
      await this.commandHandler.init();

      await this.login();
      await this.connect();
      await this.keepRunning();
    } catch (error) {
      this.logger.error(`Init error: ${error.message}`);
      process.exit(1);
    }
  }

  /**
   * Log in to xat.
   */
  async login() {
    var loginData;

    try {
      loginData = JSON.parse(await fs.readFile("./cache/login.json", "utf-8"));
    } catch {}

    if (loginData?.i === undefined) {
      this.isLoggingIn = true;
    } else {
      this.loginInfo = loginData;
    }
  }

  /**
   * Establishes a WebSocket connection.
   * @param {number} room - Chat ID
   */
  async connect(room = 0) {
    if (this.isConnected) return;
    if (this.isLoggingIn) room = 3;

    const ws = new WebSocket(process.env.WEBSOCKET_URL, {
      headers: {
        Origin: process.env.WEBSOCKET_ORIGIN,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    // Websocket is connected
    ws.on("open", async () => {
      this.isConnected = true;
      this.ws = ws;
      await this.send("y", {
        r: room > 0 ? room : this.chatInfo.id,
        v: 0,
        u: this.loginInfo.i || 2,
      });
    });

    //  Websocket got a message
    ws.on("message", async (data) => {
      this.logger.info(`<< ${data}`);
      try {
        const packets = xmlToArray(data.toString());
        for (const [type, packet] of packets) {
          await this.packetHandler.handle(type, packet);
        }
      } catch (error) {
        this.logger.error(`Packet error: ${error.message}`);
      }
    });

    // Websocket got closed
    ws.on("close", () => {
      this.isConnected = false;
      this.logger.info("Connection closed");
    });

    // Websocket got an error
    ws.on("error", (error) => {
      this.logger.error(`WebSocket error: ${error.message}`);
      this.isConnected = false;
    });
  }

  /**
   * Sends a packet to xat.
   * @param {string} name - Packet name
   * @param {object} data - Packet data
   */
  async send(name, data) {
    if (!this.ws) return;

    try {
      let packet = `<${name} `;
      for (const [key, value] of Object.entries(data)) {
        if (value !== false) {
          packet += `${key}="${sanitize(value.toString())}" `;
        }
      }
      packet += packet.endsWith(" ") ? "/>" : " />";
      this.logger.info(`>> ${packet}`);
      this.ws.send(packet + "\x00");
    } catch (error) {
      this.logger.error(`Send error: ${error.message}`);
    }
  }

  /**
   * Retrieves about the current chat.
   */
  async getChatInfo() {
    const data = await this.xatBlogAPI.chatInfo(this.settings.chat);
    if (!data?.chat?.id) {
      this.logger.error("Chat not found");
      process.exit(1);
    }
    this.chatInfo = data.chat;
  }

  /**
   * Reply to a message.
   * @param {string} message - Message
   * @param {string} to - User ID
   */
  async reply(message, userId, to) {
    if (to === "pm") {
      return await this.sendPM(message, userId);
    } else if (to === "pc") {
      return await this.sendPC(message, userId);
    }
    await this.sendMessage(message);
  }

  /**
   * Sends a PC to a user.
   * @param {string} message - Message
   * @param {number} userId - User ID
   */
  async sendPC(message, userId) {
    await this.send("p", {
      u: userId,
      t: message,
      s: 2,
      d: this.loginInfo.i,
    });
  }

  /**
   * Sends a PM to a user.
   * @param {string} message - Message
   * @param {number} userId - User ID
   */
  async sendPM(message, userId) {
    await this.send("p", {
      u: userId,
      t: message,
    });
  }

  /**
   * Sends a message to the chat room.
   * @param {string} message - Message
   */
  async sendMessage(message) {
    await this.send("m", {
      t: message,
      u: this.loginInfo.i,
    });
  }

  /**
   * Restart xat bot.
   */
  async restart() {
    await this.send("C", {});
    this.isConnected = false;
    this.ws.terminate();
    this.connect();
  }

  /**
   * Force the bot to relogin.
   */
  async relogin() {
    await this.send("v", {
      n: this.loginInfo.i,
      p: 0,
    });
  }

  /**
   * Keeps the bot running and run tasks.
   */
  async keepRunning() {
    setInterval(async () => {
      if (this.isConnected && this.ws) {
        this.ws.ping();
      }
    }, 30000);

    setInterval(async () => {
      if (this.isConnected && this.ws) {
        await this.send("c", {
          u: this.loginInfo.i,
          t: "/KEEPALIVE",
        });
      }
    }, 900000);
  }

  /**
   * Sets up the logger.
   */
  setupLogger() {
    this.logger = createLogger({
      format: format.combine(
        format.timestamp({ format: "HH:mm:ss DD-MM-YYYY" }),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}]: ${message}`;
        })
      ),
      transports: [
        new transports.File({ filename: "./logs/app.log" }),
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(({ timestamp, level, message }) => {
              return `[${timestamp}]: ${message}`;
            })
          ),
        }),
      ],
    });
  }

  /**
   * Checks if a user has enough permissions.
   * @param {number} uid - User ID
   * @param {string} from - Source (main, pc, pm)
   * @returns {boolean} - True or False
   */
  hasPermission(uid, from) {
    const hasPermission = this.settings.owners?.includes(Number(uid));

    if (!hasPermission) {
      this.reply(
        "You can not use this command.",
        uid,
        from === "main" ? "pm" : from
      );

      return false;
    }

    return true;
  }
}
