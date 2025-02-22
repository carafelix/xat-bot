import { DataTypes } from "sequelize";
import { sequelize } from "../core/Database.js";

export const Settings = sequelize.define("settings", {
    char: {
        type: DataTypes.STRING,
        defaultValue: "!"
    },
    welcome_msg: {
        type: DataTypes.STRING,
        defaultValue: "Welcome to {chatname}, {name}!"
    },
    welcome_type: {
        type: DataTypes.STRING,
        defaultValue: "pc"
    },
    nick: {
        type: DataTypes.STRING,
        defaultValue: "Bot"
    },
    stealth: {
        type: DataTypes.STRING,
        defaultValue: "disable"
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "xat.com"
    },
    avatar: {
        type: DataTypes.STRING,
        defaultValue: "171"
    },
    pcback: {
        type: DataTypes.STRING,
        defaultValue: "https://i.thuk.space/pcback.jpg"
    },
    home: {
        type: DataTypes.STRING,
        defaultValue: "xat.com"
    },
    pstyle_image: {
        type: DataTypes.STRING,
        defaultValue: "https://i.thuk.space/tucco.gif"
    },
    pstyle_color: {
        type: DataTypes.STRING,
        defaultValue: "#000000"
    },
    pstyle_icons: {
        type: DataTypes.STRING,
        defaultValue: "true"
    },
    pstyle_grad: {
        type: DataTypes.STRING,
        defaultValue: "pg1"
    },
    statusfx_effect: {
        type: DataTypes.STRING,
        defaultValue: "1"
    },
    statusfx_speed: {
        type: DataTypes.STRING,
        defaultValue: "3"
    },
    statusfx_status2: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    statusfx_wave_frequency: {
        type: DataTypes.STRING,
        defaultValue: "5"
    },
    avatareffect: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    avatarframe: {
        type: DataTypes.STRING,
        defaultValue: "none"
    },
    avatarspeed: {
        type: DataTypes.STRING,
        defaultValue: "13"
    },
    avatarcolor: {
        type: DataTypes.STRING,
        defaultValue: "#FFFFFF"
    },
    pcplus: {
        type: DataTypes.STRING,
        defaultValue: "off"
    },
}, {
    timestamps: false
});