const emotes = require ("../config/emojis.json");
const Discord = require("discord.js")

exports.run = async (client, message, args) => {

    //If the member is not in a voice channel
    if(!message.member.voice.channel) return message.channel.send(`You're not in a voice channel ${emotes.error}`);

    //If there's no music
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send(`No music playing on this server ${emotes.error}`);

    //Repeat mode
    const repeatMode = client.player.getQueue(message.guild.id).repeatMode;

    //If the mode is enabled
    if(repeatMode) {

        client.player.setRepeatMode(message.guild.id, false);

        //Message
        return message.channel.send(`Repeat mode disabled ${emotes.success}`);

    //If the mode is disabled
    } else {

        client.player.setRepeatMode(message.guild.id, true);

        //Message
        return message.channel.send(`Repeat mode enabled ${emotes.success}`);

    }
    
}
