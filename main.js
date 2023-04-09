const { Player } = require('discord-player');
const Genius = require("genius-lyrics");
const { Client, GatewayIntentBits } = require('discord.js');

global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ],
   disableMentions: 'everyone',
});

client.config = require('./config');

global.genius = new Genius.Client();
global.player = new Player(client, client.config.opt.discordPlayer);

player.on('debug', (message) => {
    console.log(`[Debug] ${message}`);
});

require('./src/loader');

client.login(client.config.app.token);