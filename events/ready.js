const chalk = require('chalk');

let log = console.log;

module.exports = async (client) => {
    log(chalk.white(`--------------------------------------------------`))
    log(chalk.cyan(`-> Logged in as: ${client.user.username}`))
    log(chalk.white(`--------------------------------------------------`))
    log(chalk.cyan(`-> Ready on ${client.guilds.cache.size} servers for a total of ${client.users.cache.size} users`))
    log(chalk.white(`--------------------------------------------------`))

    client.user.setActivity(`${client.config.app.px}help for ${client.users.cache.size} users in ${client.guilds.cache.size} servers`);
};