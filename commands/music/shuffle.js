module.exports = {
    name: 'shuffle',
    aliases: ['sh'],
    utilisation: client.config.app.px + 'shuffle',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        if (!queue.tracks[0]) return message.channel.send(`No music in the queue after the current one ${message.author}... try again ? ❌`);

        await queue.shuffle();

        return message.channel.send(`Queue shuffled **${queue.tracks.length}** song(s) ! ✅`);
    },
};