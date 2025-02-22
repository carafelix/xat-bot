import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error opening the database.", err.message);
  } else {
    console.log("Database started successfully.");
  }
});

const createSettingsTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      enable_welcome_message BOOLEAN DEFAULT 0,
      char TEXT DEFAULT "!",
      welcome_msg TEXT DEFAULT "Welcome to {chatname}, {name}!",
      welcome_type TEXT DEFAULT "pc",
      bot_nick TEXT DEFAULT "DevBot",
      stealth TEXT DEFAULT "disable",
      status TEXT DEFAULT "xat.com",
      avatar TEXT DEFAULT "171",
      pcback TEXT DEFAULT "https://i.thuk.space/pcback.jpg",
      home TEXT DEFAULT "xat.com",
      pstyle TEXT DEFAULT "https://i.thuk.space/tucco.gif"
    )
  `;

  db.run(query, (err) => {
    if (err) {
      console.error("Error creating table:", err.message);
    } else {
      console.log("Table settings created successfully!");
    }
  });
};

createSettingsTable();

export const closeDB = () => {
  db.close((err) => {
    if (err) {
      console.error("Error closing the database.", err.message);
    } else {
      console.log("Database closed successfully.");
    }
  });
};

export default db;
