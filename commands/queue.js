const emotes = require ("../config/emojis.json");

module.exports.run = async (client, message) => {

    if(!message.member.voice.channel) return message.channel.send(`**You're not in a voice channel ${emotes.error}**`);

    const queue = client.player.getQueue(message.guild.id);

    if(!queue) return message.channel.send(`**No tracks currently playing ${emotes.error}**`);

    message.channel.send(`**Server queue ${emotes.queue}** \nCurrent - ${queue.playing.name} | ${queue.playing.author}\n`+
    (
        queue.tracks.map((track, i) => {
            return `#${i+1} - ${track.name} | ${track.author}`
        }).join('\n')
    ));

};

  
module.exports.config = {
    name: "queue",
    aliases: []
};
