const Discord = require("discord.js")
const fs = require("fs")
const emotes = require ("../config/emojis.json")

module.exports.run = async (client, message, args) => {

    if(!message.member.voice.channel) return message.channel.send(`**You're not in a voice channel ${emotes.error}**`)

    if(!client.player.isPlaying(message.guild.id)) return message.channel.send(`**No music playing on this server ${emotes.error}**`)
    if (!args[0]) return message.channel.send(`**Please enter a number ${emotes.error}**`)
    if (isNaN(args[0])) return message.channel.send(`**Please enter a valid number ${emotes.error}**`)
  
    client.player.setVolume(message.guild.id, parseInt(args.join(" ")));
    
    message.channel.send("**Volume set to** `" +  args.join(" ") + "`" + `** ** ${emotes.success}`);


}

module.exports.config = {
  name: "set-volume",
  aliases: []
}
