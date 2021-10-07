module.exports = {
    name: 'lyrics',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}lyrics',

    async execute(client, message, args) {
        const queue = client.player.getQueue(message);
        if (!queue && !args[0]) return message.channel.send(`🚫 | You need to provide a track!`);

        message.channel.sendTyping();
        const lyrics = await client.player.lyrics(args[0] ? args.join(' ') : client.player.nowPlaying(message).title);
        message.channel.stopTyping();
        
        if (lyrics === null) return message.channel.send(`🚫 | I have not find lyrics for this song! Please retry or search for an other track!`);

        message.channel.send(lyrics.lyrics.length > 1900 ? lyrics.lyrics.substr(0, 1897) + '...' : lyrics.lyrics);
    },
};
