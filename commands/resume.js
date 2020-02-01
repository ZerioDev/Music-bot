const Discord = require("discord.js")
const fs = require("fs")
const emotes = require ("../config/emojis.json")

module.exports.run = async (client, message, args) => {

    if(!message.member.voice.channel) return message.channel.send(`**You're not in a voice channel ${emotes.error}**`)
  
    let song = await client.player.resume(message.guild.id);

    if(!song) return message.channel.send(`**No songs currently playing ${emotes.error}**`);
    
    message.channel.send(`**Song ${song.name} resumed ${emotes.success}**`);


}

module.exports.config = {
  name: "resume",
  aliases: []
}