const emotes = require ("../config/emojis.json");

module.exports.run = async (client, message) => {

    if(!message.member.voice.channel) return message.channel.send(`**You're not in a voice channel ${emotes.error}**`);

    const queue = client.player.getQueue(message.guild.id);

    if(!queue) return message.channel.send(`**No songs currently playing ${emotes.error}**`);

    message.channel.send(`**Server queue ${emotes.queue}** \n`+(queue.songs.map((song, i) => {
        return `${i === 0 ? 'Current' : `#${i+1}`} - ${song.name} | ${song.author}`
    }).join('\n')));

};

  
module.exports.config = {
    name: "queue",
    aliases: []
};
