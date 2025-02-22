import {
  getAvatar,
  getBotNick,
  getHome,
  getPcback,
  getPstyle,
  getStatus,
  getStealth,
} from "../Settings/BotSettings.js";

export default {
  name: "y", // Packet name

  /**
   * Chat main connection
   * @param {object} bot - Bot instance
   * @param {object} packet - Packet data
   */
  async execute(bot, packet) {
    if (!packet.i) {
      return await bot.connect();
    }

    // Relogging mode
    if (bot.isLoggingIn) {
      return await bot.send("v", {
        n: bot.loginInfo.username,
        a: bot.loginInfo.apikey,
      });
    }

    if (!bot.loginInfo.k1) return;

    // Connection data
    const j2Packet = {
      cb: packet.c,
      Y: 2,
      l5: 65535,
      l4: 500,
      l3: 500,
      l2: 0,
      y: packet.i,
      k: bot.loginInfo.k1,
      k3: bot.loginInfo.k3,
      d1: bot.loginInfo.d1 || false,
      z: "m1.67,3",
      p: 0,
      c: bot.chatInfo.id,
      f: 0,
      u: bot.loginInfo.i,
    };

    // Disabled powers
    if (bot.settings.disabledPowers) {
      for (const k of bot.settings.disabledPowers) {
        const subid = Math.pow(2, k % 32);
        const section = "m" + (k >> 5);
        if (j2Packet[section]) {
          j2Packet[section] += subid;
        } else {
          j2Packet[section] = subid;
        }
      }
    }

    // Account flags
    j2Packet.d0 = bot.loginInfo.d0 || false;

    // Bride and powers
    for (let i = 2; i <= 35; i++) {
      const pid = "d" + i;
      if (bot.loginInfo[pid]) {
        j2Packet[pid] = bot.loginInfo[pid];
      }
    }

    const BotNick = await getBotNick();
    const stealth = await getStealth();
    const status = await getStatus();
    const avatar = await getAvatar();
    const pcback = await getPcback();
    const home = await getHome();
    const pstyle = await getPstyle();
    // Account data
    j2Packet.dO = bot.loginInfo.dO || false;
    j2Packet.dx = bot.loginInfo.dx || false;
    j2Packet.dt = bot.loginInfo.dt || false;
    j2Packet.N = bot.loginInfo.n;
    j2Packet.n = `${BotNick}##${status}`;
    j2Packet.a = `${avatar}#${pcback}`;
    j2Packet.h = home;
    j2Packet.v = bot.loginInfo.d1 ? 1 : 0;

    // Extra data
    j2Packet.W = Buffer.from(
      JSON.stringify({
        Pcplus: "off",
        // avatarSettings: Buffer.from(
        //   JSON.stringify({
        //     avatareffect: "fireworks",
        //     avatarframe: "snowy3",
        //     avatarspeed: "20",
        //     avatarcolor: "#FFFFFF",
        //   })
        // ).toString("base64"),
        Stealth: stealth,
        StatusFx: Buffer.from(
          JSON.stringify({
            effect: bot.settings.statusfx_effect,
            speed: bot.settings.statusfx_speed,
            status2: bot.settings.statusfx_status2,
            waveFrequency: bot.settings.statusfx_wave_frequency,
          })
        ).toString("base64"),
        pstyle: Buffer.from(
          JSON.stringify({
            pstyle: pstyle,
            pstylecol: bot.settings.pstyle_color,
            pstyleicon: bot.settings.pstyle_icons === "true" ? false : true,
            pstylegradient: "pg1",
            pstylePos: "",
            pstyleVersion: "0.666z",
          })
        ).toString("base64"),
      })
    ).toString("base64");

    await bot.send("j2", j2Packet);
  },
};
