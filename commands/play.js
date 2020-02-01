const Discord = require("discord.js")
const fs = require("fs")
const emotes = require ("../config/emojis.json")

module.exports.run = async (client, message, args) => {

    if(!message.member.voice.channel) return message.channel.send(`**You're not in a voice channel ${emotes.error}**`)

    if (!args[0]) return message.channel.send(`**Please enter a music ${emotes.error}**`)
  
    let aSongIsAlreadyPlaying = client.player.isPlaying(message.guild.id);
    // If there's already a song playing 
    if(aSongIsAlreadyPlaying){
        // Add the song to the queue
        let song = await client.player.addToQueue(message.guild.id, args.join(" "));
        message.channel.send(`**Song ${song.name} added to queue ${emotes.music}**`);
    } else {
        // Else, play the song
        let song = await client.player.play(message.member.voice.channel, args.join(" "));
        message.channel.send(`**Currently playing ${song.name} ${emotes.music}**`);
    }
}

  
module.exports.config = {
  name: "play",
  aliases: []
}