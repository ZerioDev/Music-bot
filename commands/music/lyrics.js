const { MessageEmbed } = require('discord.js');
const Genius = require("genius-lyrics");
const Client = new Genius.Client("API key here or blank");

module.exports = {
    name: 'lyrics',
    aliases: [],
    utilisation: '{prefix}lyrics',

    async execute(client, message, args) {
      const queue = player.getQueue(message.guild.id);

      if (!queue && !args[0]) return message.channel.send(`No track in queue ${message.author}... try again ? ❌`);
	  
      message.channel.sendTyping();

	  const tempterm = queue.current.title;
	  var searches;
	  
	  if(tempterm.includes('('))
	  {
		var words = tempterm.split("(");
		words.pop();
		const searchterm = words[0];
		searches = await Client.songs.search(searchterm);
	  }
	  else
	  {
		searches = await Client.songs.search(tempterm);
	  }
	  
	  if (searches === null) return message.channel.send(`🚫 | Couldn' find lyrics for this song! Please retry or search for an other track!`);
	  
	  const firstSong = searches[0];
	  const lyrics = await firstSong.lyrics();

      

      const embed = new MessageEmbed()
	  .setColor('#2beddd')
      .setTitle(`**LYRICS | ${queue.current.title}**`)
      .setDescription(lyrics)
      .setFooter(`Made by ShambaC#3440`)

      message.channel.send({embeds:[embed]})   
	},
};