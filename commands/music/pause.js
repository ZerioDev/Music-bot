module.exports = {
    name: 'pause',
    aliases: [],
    utilisation: '{prefix}pause',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        const success = queue.setPaused(true);

        return message.channel.send(success ? `Current music ${queue.current.title} paused ✅` : `Something went wrong ${message.author}... try again ? ❌`);
    },
};