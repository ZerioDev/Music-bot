
const { QueryType } = require('discord-player');

module.exports.search = async function(message,param){ 
        const res = await player.search(param, {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length){
            message.channel.send(`No results found ${message.author}... try again ? ❌`);
            return null;
        }
        return res;
}


module.exports.createQueue = async function(player, message){
    const queue = await player.createQueue(message.guild, {
        ytdlOptions: {
            quality: "highest",
            filter: "audioonly",
            highWaterMark: 1 << 25,
            dlChunkSize: 0,
        },
        metadata: message.channel
    });

    return queue;
}

module.exports.voiceConnect = async function(message, queue){
    try {
        if (!queue.connection) await queue.connect(message.member.voice.channel);
    } catch {
        await player.deleteQueue(message.guild.id);
        return message.channel.send(`I can't join the voice channel ${message.author}... try again ? ❌`);
    }
}