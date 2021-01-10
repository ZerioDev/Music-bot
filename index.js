// Import packages
const Discord = require('discord.js');
const { Player } = require('discord-player');

// Allow reading from .env
require('dotenv').config();

// Initialize Discord Client.
const client = new Discord.Client();
client.login(process.env.TOKEN);

// Configure client
require('./config/clientConfig')(client, Player, Discord);

// Load all commands and events.
require('./services/commandLoader')(client);
require('./services/eventLoader')(client);
require('./services/playerLoader')(client);