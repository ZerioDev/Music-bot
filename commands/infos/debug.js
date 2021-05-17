module.exports = {
    name: 'debug',
    aliases: [],
    category: 'Infos',
    utilisation: 'debug',

    execute(client, message) {
        message.channel.send(`${client.emotes.success} - ${client.user.username} connected in **${client.voice.connections.size}** channels !`);
    },
};
