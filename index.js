//Modules
const Discord = require("discord.js");
const fs = require("fs");

//New client
const client = new Discord.Client();

//The bot connects using the configuration file
const settings = require ("./config/bot.json")

//Create a new Player
const { Player } = require("discord-player")

//To easily access the player
const player = new Player(client)
client.player = player;

//Events
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading event ${eventName}`);
        client.on(eventName, event.bind(null, client));
    });
});

//New commands
client.commands = new Discord.Collection();

//Commands
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loading command ${commandName}`);
        client.commands.set(commandName, props);
    });
});

//Login
client.login(settings.token_bot);
