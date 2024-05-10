const { Player } = require("discord-player");
const { Client, GatewayIntentBits } = require("discord.js");

global.client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
  disableMentions: "everyone",
});

client.config = require("./config");

const player = new Player(client, client.config.opt.discordPlayer);
player.extractors.loadDefault();

require("./loader");

client.login(client.config.app.token);
