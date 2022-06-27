const { Player } = require('discord-player');
const { Client, Intents } = require('discord.js');
const  chalk = require('chalk');

global.client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
    disableMentions: 'everyone',
});

client.config = require('./config');

global.player = new Player(client, client.config.opt.discordPlayer);

require('./src/loader');
require('./src/events');

let log = console.log;

client.on("debug", function (info) {
    log(chalk.yellow(` -> debug: ${info}`));
});

client.on("error", function (error) {
    log(chalk.red(` -> (${error.code}) ${error.name}: ${error.message} \n\n--------------------------------------------\n\n ${error.stack}`));
});

client.on("warn", function (info) {
    log(chalk.yellow(` -> warn: ${info}`));
});



client.login(client.config.app.token);