module.exports = {
    name: 'remove',
    aliases: ['delete'],
    category: 'Music',
    utilisation: '{prefix}remove',

    execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

        const queue = client.player.getQueue(message);

        if (!queue) return message.channel.send(`${client.emotes.error} - No music currently playing !`);

        if (queue.tracks.length < 2) return message.channel.send(`${client.emotes.error} - No more music in the queue to remove !`);

        if (!args[0]) return message.channel.send(`${client.emotes.error} Wrong usages. Please use **\`${client.discord.prefix}remove queue_number\`** between 1 to ${queue.tracks.length - 1}`).catch(console.error);

        if (isNaN(args[0])) return message.channel.send(`${client.emotes.error} Invalid number.\nPlease use queue number between 1 to ${queue.tracks.length - 1}`).catch(console.error);

        if (Number(args[0]) === 0) return message.channel.send(`${client.emotes.error} I can't remove a song I'm already playing.\nPlease use queue number between 1 to ${queue.tracks.length - 1}`).catch(console.error);

        if (Number(args[0]) >= queue.tracks.length || Number(args[0]) < 1 || !queue.tracks[args[0]]) return message.channel.send(`${client.emotes.error} - No songs found.\nPlease use queue number between 1 to ${queue.tracks.length - 1}`).catch(console.error);

        const song = queue.tracks[Number(args[0])];

        client.player.remove(message, Number(args[0]));

        message.channel.send(`${client.emotes.success} - removed **${song.title}** from the queue !`);
    },
};
