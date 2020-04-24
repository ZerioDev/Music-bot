const emotes = require ("../config/emojis.json");

module.exports.run = async (client, message) => {

    if(!message.member.voice.channel) return message.channel.send(`**You're not in a voice channel ${emotes.error}**`);

    if(!client.player.isPlaying(message.guild.id)) return message.channel.send(`**No music playing on this server ${emotes.error}**`);

    const repeatMode = client.player.getQueue(message.guild.id).repeatMode;

    if(repeatMode){
        client.player.setRepeatMode(message.guild.id, false);
        return message.channel.send(`**Repeat mode disabled ${emotes.success}**`);
    } else {
        client.player.setRepeatMode(message.guild.id, true);
        return message.channel.send(`**Repeat mode enabled ${emotes.success}**`);
    }
    
};

module.exports.config = {
    name: "set-repeat",
    aliases: []
};
