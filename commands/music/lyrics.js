const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");

var str = 'abcdefghijkl';
console.log(str.match(/.{1,2000}/g));

const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
            
module.exports = {
    name: 'lyrics',
    description: 'Lyrics Command for the Music',
    voiceChannel: true,

    async execute({ client, inter }) {
        
        const queue = player.getQueue(inter.guildId);
        const track = queue.current;
        
    if (!queue) return inter.reply("There is nothing playing.").catch(console.error);

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(track.title, "");
      if (!lyrics) lyrics = `No lyrics found for ${track.title}.`;
    } catch (error) {
      lyrics = `No lyrics found for ${track.title}.`;
    }

    let lyricsEmbed = new EmbedBuilder()
      .setTitle(`Lyrics For - ${track.title}.`)
      .setThumbnail(track.thumbnail)
      .setDescription(lyrics)
      .setColor("#eb7434")
      .setFooter({ text: 'Music comes first - Made with heart by Zerio :heart:', iconURL: inter.member.avatarURL({ dynamic: true })})
      .setTimestamp();

    return await inter.reply({
        embeds: [lyricsEmbed],
      });
}
}
