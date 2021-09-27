module.exports = {
    name: 'remove',
    aliases: ['rm'],
    utilisation: '{prefix}remove',
    voiceChannel: true,

    async execute(client, message,args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        if (!queue.tracks[0]) return message.channel.send(`No music in the queue after the current one ${message.author}... try again ? ❌`);
        if(args[0] > queue.tracks.length || args[0] < 1) return message.channel.send("That is not a valid track!... try again ? ❌")
        let song = queue.tracks[Number(args[0]) - 1]
        queue.tracks.splice(Number(args[0]) - 1, 1)

        message.channel.send(`Removed song at queue position ${song.title} 🗑️`);
    },
};