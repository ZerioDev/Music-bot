const emotes = require ("../config/emojis.json");
const Discord = require("discord.js")

exports.run = async (client, message, args) => {

    //If the member is not in a voice channel
    if(!message.member.voice.channel) return message.channel.send(`You're not in a voice channel ${emotes.error}`);

    //Get song
    const song = await client.player.resume(message.guild.id);

    //If there's no music
    if(!song) return message.channel.send(`No songs currently playing ${emotes.error}`);

    //Message
    message.channel.send(`Song ${song.name} resumed ${emotes.success}`);

}
