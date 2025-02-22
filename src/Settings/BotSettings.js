import db from "../core/ConnectDB.js";

// WELCOME SETTINGS ON/OFF QUERIES //
export const setEnableWelcomeMessage = (enable_welcome_message) => {
  return new Promise((resolve, reject) => {
    const checkQuery = `SELECT * FROM settings`;

    db.get(checkQuery, (err, row) => {
      if (err) {
        console.error("Something went wrong, please try again.", err.message);
        return reject(err.message);
      }

      if (row) {
        const updateQuery = `UPDATE settings SET enable_welcome_message = ?`;

        db.run(updateQuery, [enable_welcome_message], function (err) {
          if (err) {
            console.error("Something went wrong", err.message);
            return reject(err.message);
          }

          resolve(
            `Welcome message setting updated successfully: ${enable_welcome_message}`
          );
        });
      } else {
        const insertQuery = `INSERT INTO settings (enable_welcome_message) VALUES (?)`;

        db.run(insertQuery, [enable_welcome_message], function (err) {
          if (err) {
            console.error("Something went wrong:", err.message);
            return reject(err.message);
          }

          resolve(
            `Welcome message setting inserted successfully: ${enable_welcome_message}`
          );
        });
      }
    });
  });
};

export const getEnableWelcomeMessage = () => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT enable_welcome_message FROM settings LIMIT 1",
      [],
      (err, row) => {
        if (err) {
          console.error("Erro ao ler o banco de dados:", err.message);
          return reject(err);
        }
        resolve(
          row && row.enable_welcome_message !== null
            ? row.enable_welcome_message
            : 0
        );
      }
    );
  });
};

// WELCOME SETTINGS ON/OFF QUERIES //

// CHAR QUERIES //

export const setChar = (char) => {
  return new Promise((resolve, reject) => {
    const checkQuery = `SELECT * FROM settings`;

    db.get(checkQuery, (err, row) => {
      if (err) {
        console.error("Something went wrong, please try again.", err.message);
        return reject(err.message);
      }

      if (row) {
        const updateQuery = `UPDATE settings SET char = ?`;

        db.run(updateQuery, [char], function (err) {
          if (err) {
            console.error("Something went wrong", err.message);
            return reject(err.message);
          }

          resolve(`char successfully updated: ${char}`);
        });
      } else {
        const insertQuery = `INSERT INTO settings (char) VALUES (?)`;

        db.run(insertQuery, [char], function (err) {
          if (err) {
            console.error("Something went wrong:", err.message);
            return reject(err.message);
          }

          resolve(`char successfully updated: ${char}`);
        });
      }
    });
  });
};

export const getChar = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT char FROM settings LIMIT 1`;

    db.get(query, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row && row.char ? row.char : "!");
      }
    });
  });
};

// CHAR QUERIES //

// WELCOME MESSAGE QUERIES //

export const setWelcomeMessage = (welcomeMsg) => {
  return new Promise((resolve, reject) => {
    const checkQuery = `SELECT * FROM settings`;

    db.get(checkQuery, (err, row) => {
      if (err) {
        console.error("Something went wrong, please try again.", err.message);
        return reject(err.message);
      }

      if (row) {
        const updateQuery = `UPDATE settings SET welcome_msg = ?`;

        db.run(updateQuery, [welcomeMsg], function (err) {
          if (err) {
            console.error("Something went wrong", err.message);
            return reject(err.message);
          }

          resolve(`Welcome message successfully updated: ${welcomeMsg}`);
        });
      } else {
        const insertQuery = `INSERT INTO settings (welcome_msg) VALUES (?)`;

        db.run(insertQuery, [welcomeMsg], function (err) {
          if (err) {
            console.error("Something went wrong:", err.message);
            return reject(err.message);
          }

          resolve(`Welcome message successfully updated: ${welcomeMsg}`);
        });
      }
    });
  });
};

export const getWelcomeMessage = () => {
  return new Promise((resolve, reject) => {
    db.get("SELECT welcome_msg FROM settings LIMIT 1", [], (err, row) => {
      if (err) {
        console.error("Error reading the database:", err.message);
        return reject(err);
      }

      resolve(row ? row.welcome_msg : "Welcome {user} to {chatname}!");
    });
  });
};

// WELCOME MESSAGE QUERIES //

// WELCOME TYPE QUERIES //

export const setWelcomeType = (welcome_type) => {
  return new Promise((resolve, reject) => {
    const checkQuery = `SELECT * FROM settings`;

    db.get(checkQuery, (err, row) => {
      if (err) {
        console.error("Something went wrong, please try again.", err.message);
        return reject(err.message);
      }

      if (row) {
        const updateQuery = `UPDATE settings SET welcome_type = ?`;

        db.run(updateQuery, [welcome_type], function (err) {
          if (err) {
            console.error("Something went wrong", err.message);
            return reject(err.message);
          }

          resolve(`Welcome type setting updated successfully: ${welcome_type}`);
        });
      } else {
        const insertQuery = `INSERT INTO settings (welcome_type) VALUES (?)`;

        db.run(insertQuery, [welcome_type], function (err) {
          if (err) {
            console.error("Something went wrong:", err.message);
            return reject(err.message);
          }

          resolve(
            `Welcome type setting inserted successfully: ${welcome_type}`
          );
        });
      }
    });
  });
};

export const getWelcomeType = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT welcome_type FROM settings LIMIT 1`;

    db.get(query, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row && row.welcome_type ? row.welcome_type : "PM");
      }
    });
  });
};
// WELCOME TYPE QUERIES //

// BOT NICK QUERIES //

export const setBotNick = (bot_nick) => {
  return new Promise((resolve, reject) => {
    const checkQuery = `SELECT * FROM settings`;

    db.get(checkQuery, (err, row) => {
      if (err) {
        console.error("Something went wrong, please try again.", err.message);
        return reject(err.message);
      }

      if (row) {
        const updateQuery = `UPDATE settings SET bot_nick = ?`;

        db.run(updateQuery, [bot_nick], function (err) {
          if (err) {
            console.error("Something went wrong", err.message);
            return reject(err.message);
          }

          resolve(`Bot nick updated successfully: ${bot_nick}`);
        });
      } else {
        const insertQuery = `INSERT INTO settings (bot_nick) VALUES (?)`;

        db.run(insertQuery, [bot_nick], function (err) {
          if (err) {
            console.error("Something went wrong:", err.message);
            return reject(err.message);
          }

          resolve(`Bot nick inserted successfully: ${bot_nick}`);
        });
      }
    });
  });
};

export const getBotNick = () => {
  return new Promise((resolve, reject) => {
    db.get("SELECT bot_nick FROM settings LIMIT 1", [], (err, row) => {
      if (err) {
        console.error("Error reading the database:", err.message);
        return reject(err);
      }
      resolve(row && row.bot_nick ? row.bot_nick : "DevBot");
    });
  });
};

// BOT NICK QUERIES //

// STEALTH MODE QUERIES //

export const setStealth = (stealth) => {
  return new Promise((resolve, reject) => {
    const checkQuery = `SELECT * FROM settings`;

    db.get(checkQuery, (err, row) => {
      if (err) {
        console.error("Something went wrong, please try again.", err.message);
        return reject(err.message);
      }

      if (row) {
        const updateQuery = `UPDATE settings SET stealth = ?`;

        db.run(updateQuery, [stealth], function (err) {
          if (err) {
            console.error("Something went wrong", err.message);
            return reject(err.message);
          }

          resolve(`Stealth mode updated successfully: ${stealth}`);
        });
      } else {
        const insertQuery = `INSERT INTO settings (stealth) VALUES (?)`;

        db.run(insertQuery, [stealth], function (err) {
          if (err) {
            console.error("Something went wrong:", err.message);
            return reject(err.message);
          }

          resolve(`Stealth mode inserted successfully: ${stealth}`);
        });
      }
    });
  });
};

export const getStealth = () => {
  return new Promise((resolve, reject) => {
    db.get("SELECT stealth FROM settings LIMIT 1", [], (err, row) => {
      if (err) {
        console.error("Error reading the database:", err.message);
        return reject(err);
      }
      resolve(row && row.stealth ? row.stealth : "disable");
    });
  });
};

// STEALTH MODE QUERIES //

// STATUS QUERIES //

export const setStatus = (status) => {
  return new Promise((resolve, reject) => {
    const checkQuery = `SELECT * FROM settings`;

    db.get(checkQuery, (err, row) => {
      if (err) {
        console.error("Something went wrong, please try again.", err.message);
        return reject(err.message);
      }

      if (row) {
        const updateQuery = `UPDATE settings SET status = ?`;

        db.run(updateQuery, [status], function (err) {
          if (err) {
            console.error("Something went wrong", err.message);
            return reject(err.message);
          }

          resolve(`Status successfully updated: ${status}`);
        });
      } else {
        const insertQuery = `INSERT INTO settings (status) VALUES (?)`;

        db.run(insertQuery, [status], function (err) {
          if (err) {
            console.error("Something went wrong:", err.message);
            return reject(err.message);
          }

          resolve(`Status successfully updated: ${status}`);
        });
      }
    });
  });
};

export const getStatus = () => {
  return new Promise((resolve, reject) => {
    db.get("SELECT status FROM settings LIMIT 1", [], (err, row) => {
      if (err) {
        console.error("Error reading the database:", err.message);
        return reject(err);
      }

      resolve(row ? row.status : "xat.com");
    });
  });
};

// STATUS QUERIES //

// AVATAR QUERIES //

export const setAvatar = (avatar) => {
  return new Promise((resolve, reject) => {
    const checkQuery = `SELECT * FROM settings`;

    db.get(checkQuery, (err, row) => {
      if (err) {
        console.error("Something went wrong, please try again.", err.message);
        return reject(err.message);
      }

      if (row) {
        const updateQuery = `UPDATE settings SET avatar = ?`;

        db.run(updateQuery, [avatar], function (err) {
          if (err) {
            console.error("Something went wrong", err.message);
            return reject(err.message);
          }

          resolve(`Avatar successfully updated: ${avatar}`);
        });
      } else {
        const insertQuery = `INSERT INTO settings (avatar) VALUES (?)`;

        db.run(insertQuery, [avatar], function (err) {
          if (err) {
            console.error("Something went wrong:", err.message);
            return reject(err.message);
          }

          resolve(`Avatar successfully updated: ${avatar}`);
        });
      }
    });
  });
};

export const getAvatar = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT avatar FROM settings LIMIT 1`;

    db.get(query, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row && row.avatar ? row.avatar : "171");
      }
    });
  });
};

// AVATA  QUERIES //

// PCBACK QUERIES //

export const setPcback = (pcback) => {
  return new Promise((resolve, reject) => {
    const checkQuery = `SELECT * FROM settings`;

    db.get(checkQuery, (err, row) => {
      if (err) {
        console.error("Something went wrong, please try again.", err.message);
        return reject(err.message);
      }

      if (row) {
        const updateQuery = `UPDATE settings SET pcback = ?`;

        db.run(updateQuery, [pcback], function (err) {
          if (err) {
            console.error("Something went wrong", err.message);
            return reject(err.message);
          }

          resolve(`Pcback successfully updated: ${pcback}`);
        });
      } else {
        const insertQuery = `INSERT INTO settings (pcback) VALUES (?)`;

        db.run(insertQuery, [pcback], function (err) {
          if (err) {
            console.error("Something went wrong:", err.message);
            return reject(err.message);
          }

          resolve(`Pcback successfully updated: ${pcback}`);
        });
      }
    });
  });
};

export const getPcback = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT pcback FROM settings LIMIT 1`;

    db.get(query, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          row && row.pcback ? row.pcback : "https://i.thuk.space/pcback.jpg"
        );
      }
    });
  });
};

// PCBACK QUERIES //

// HOME QUERIES //

export const setHome = (home) => {
  return new Promise((resolve, reject) => {
    const checkQuery = `SELECT * FROM settings`;

    db.get(checkQuery, (err, row) => {
      if (err) {
        console.error("Something went wrong, please try again.", err.message);
        return reject(err.message);
      }

      if (row) {
        const updateQuery = `UPDATE settings SET home = ?`;

        db.run(updateQuery, [home], function (err) {
          if (err) {
            console.error("Something went wrong", err.message);
            return reject(err.message);
          }

          resolve(`Home successfully updated: ${home}`);
        });
      } else {
        const insertQuery = `INSERT INTO settings (home) VALUES (?)`;

        db.run(insertQuery, [home], function (err) {
          if (err) {
            console.error("Something went wrong:", err.message);
            return reject(err.message);
          }

          resolve(`Home successfully updated: ${home}`);
        });
      }
    });
  });
};

export const getHome = () => {
  return new Promise((resolve, reject) => {
    db.get("SELECT home FROM settings LIMIT 1", [], (err, row) => {
      if (err) {
        console.error("Error reading the database:", err.message);
        return reject(err);
      }

      resolve(row ? row.home : "xat.com");
    });
  });
};

// HOME QUERIES //

// PSTYLE QUERIES //

export const setPstyle = (pstyle) => {
  return new Promise((resolve, reject) => {
    const checkQuery = `SELECT * FROM settings`;

    db.get(checkQuery, (err, row) => {
      if (err) {
        console.error("Something went wrong, please try again.", err.message);
        return reject(err.message);
      }

      if (row) {
        const updateQuery = `UPDATE settings SET pstyle = ?`;

        db.run(updateQuery, [pstyle], function (err) {
          if (err) {
            console.error("Something went wrong", err.message);
            return reject(err.message);
          }

          resolve(`Pstyle successfully updated: ${pstyle}`);
        });
      } else {
        const insertQuery = `INSERT INTO settings (pstyle) VALUES (?)`;

        db.run(insertQuery, [pstyle], function (err) {
          if (err) {
            console.error("Something went wrong:", err.message);
            return reject(err.message);
          }

          resolve(`Pstyle successfully updated: ${pstyle}`);
        });
      }
    });
  });
};

export const getPstyle = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT pstyle FROM settings LIMIT 1`;

    db.get(query, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          row && row.pstyle ? row.pstyle : "https://i.thuk.space/tucco.gif"
        );
      }
    });
  });
};

// PSTYLE QUERIES //
