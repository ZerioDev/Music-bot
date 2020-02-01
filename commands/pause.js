const Discord = require("discord.js")
const fs = require("fs")
const emotes = require ("../config/emojis.json")

module.exports.run = async (client, message, args) => {

    if(!message.member.voice.channel) return message.channel.send(`**You're not in a voice channel ${emotes.error}**`)
  
    let song = await client.player.pause(message.guild.id);

    if(!client.player.isPlaying(message.guild.id)) return message.channel.send(`**No music playing on this server ${emotes.error}**`)
            
    message.channel.send(`**Song ${song.name} paused ${emotes.success}**`);

    
}

module.exports.config = {
  name: "pause",
  aliases: []
}