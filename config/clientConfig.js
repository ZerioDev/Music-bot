module.exports = function (client, Player, Discord) {
    client.config = require('../config/bot');
    client.commands = new Discord.Collection();
    client.player = new Player(client);
    client.emotes = client.config.emojis;
    client.filters = client.config.filters;
    
};