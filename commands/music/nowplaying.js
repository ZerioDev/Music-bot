const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    utilisation: '{prefix}nowplaying',
    voiceChannel: true,

    execute(client, message) {
        let falseEmbed = new MessageEmbed()
        falseEmbed.setAuthor({name: 'false', iconURL: 'https://cdn.discordapp.com/attachments/625276725269364738/961355212512169984/unknown.png'})
        falseEmbed.setDescription('no songs playin')
        falseEmbed.setTimestamp()
        const queue = player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.channel.send({embeds: [falseEmbed]});
        const track = queue.current;
        const embed = new MessageEmbed();
        embed.setAuthor({name: 'false', iconURL: 'https://cdn.discordapp.com/attachments/625276725269364738/961355228446347264/unknown.png'})
        embed.setDescription(`Song: ${track.title}`)
        embed.setTimestamp()
        message.channel.send({ embeds: [embed]});
    },
};