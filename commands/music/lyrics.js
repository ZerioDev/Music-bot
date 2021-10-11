const { MessageEmbed } = require('discord.js');
const { Lyrics } = require("@discord-player/extractor");
const lyricsClient = Lyrics.init();

module.exports = {
    name: 'lyrics',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}lyrics',

    async execute(client, message, args) {
      const queue = player.getQueue(message.guild.id);

      if (!queue && !args[0]) return message.channel.send(`Specify a track ${message.author}... try again ? ❌`);

      message.channel.sendTyping();

     const song = await lyricsClient.search(args[0] ? args.join(' ') : queue.current.title);
     
      if (song.lyrics.length === 0) return message.channel.send(`🚫 | Couldnot find lyrics for this song! Please retry or search for an other track!`);
      
      const embed = new MessageEmbed()
      .setTitle(`**LYRICS | ${song.title}**`)
      .setDescription(song.lyrics.length > 1900 ? song.lyrics.substr(0, 1897) + '...' : song.lyrics)
      .setFooter(`Code by chix_xnay#7401`)

      message.channel.send({embeds:[embed]})     
    },
};
