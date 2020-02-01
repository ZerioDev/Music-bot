const Discord = require("discord.js")
const fs = require("fs")
const emotes = require ("../config/emojis.json")

module.exports.run = async (client, message, args) => {
  
    if(!message.member.voice.channel) return message.channel.send(`**You're not in a voice channel ${emotes.error}**`)

    if(!client.player.isPlaying(message.guild.id)) return message.channel.send(`**No music playing on this server ${emotes.error}**`)

    client.player.clearQueue(message.guild.id);

    message.channel.send(`**Queue cleared ${emotes.success}**`);


}

module.exports.config = {
  name: "clear-queue",
  aliases: []
}
