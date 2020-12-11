const fs = require('fs');
const discord = require('discord.js');

const client = new discord.Client({ disableMentions: 'everyone' });

const { Player } = require('discord-player');

client.player = new Player(client);
client.config = require('./config/bot.json');
client.emotes = require('./config/emojis.json');
client.filters = require('./config/filters.json');
client.commands = new discord.Collection();

const core = fs.readdirSync('./commands/core').filter(file => file.endsWith('.js'));
const infos = fs.readdirSync('./commands/infos').filter(file => file.endsWith('.js'));
const music = fs.readdirSync('./commands/music').filter(file => file.endsWith('.js'));

for (const file of core) {
    console.log(`Loading command ${file}`);
    const command = require(`./commands/core/${file}`);
    client.commands.set(command.name.toLowerCase(), command);
};

for (const file of infos) {
    console.log(`Loading command ${file}`);
    const command = require(`./commands/infos/${file}`);
    client.commands.set(command.name.toLowerCase(), command);
};

for (const file of music) {
    console.log(`Loading command ${file}`);
    const command = require(`./commands/music/${file}`);
    client.commands.set(command.name.toLowerCase(), command);
};

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};

client.login(client.config.token_bot);