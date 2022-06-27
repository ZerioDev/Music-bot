const  chalk = require('chalk');

let log = console.log;

module.exports = async (client) => {
    client.user.setActivity(`help for ${client.users.cache.size} users in ${client.guilds.cache.size} servers`);
    log(chalk.white('Status Updated -> New Status: help for ${client.users.cache.size} users in ${client.guilds.cache.size} servers'))
};