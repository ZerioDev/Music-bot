const musicUtils = require('./musicutils/musicutils');

module.exports = {
    name: 'play',
    aliases: ['p'],
    utilisation: '{prefix}play [song name/URL]',
    voiceChannel: true,

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(`Please enter a valid search ${message.author}... try again ? ❌`);
        var searchParam = args.join(' ');
        const res = await musicUtils.search(message,searchParam);
        if(!res){
            message.channel.send(`No results found ${message.author}... try again ? ❌`);
        }
        const queue = await musicUtils.createQueue(player,message);
        await musicUtils.voiceConnect(message, queue);

        await message.channel.send(`Loading your ${res.playlist ? 'playlist' : 'track'}... 🎧`);

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};