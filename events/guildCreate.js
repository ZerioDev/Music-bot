const chalk = require('chalk');
const discord = require('discord.js');

let log = console.log;

module.exports = async (client) => {
    let guild = client.guild();
    client.user.setActivity(`help for ${client.users.cache.size} users in ${client.guilds.cache.size} servers`);
    log(chalk.white('Status Updated -> New Status: help for ${client.users.cache.size} users in ${client.guilds.cache.size} servers'))
    let embed = new discord.Embed()
        .setTitle(client.user.username)
        .setDescription([
            'Hello, I\'m ' + client.user.username + '. Thanks for inviting me.',
            'To see a list of all of my commands type `!help`.',
            '',
            'If you wish to use my DJ commands make sure to create a role with the name `DJ`.'
        ].join('\n'))
        .setThumbnail({ url: client.user.displayAvatarURL() })
        .setTimestamp()
        .setFooter({ text: client.user.username, iconUrl: client.user.displayAvatarURL() })
    guild.systemChannel.send({ embed: embed })
};