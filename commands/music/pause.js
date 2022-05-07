const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'pause',
    aliases: [],
    utilisation: '{prefix}pause',
    voiceChannel: true,

    execute(client, message) {
        let falseEmbed = new MessageEmbed()
        falseEmbed.setAuthor({name: 'false', iconURL: 'https://cdn.discordapp.com/attachments/625276725269364738/961355228446347264/unknown.png'})
        falseEmbed.setDescription('no songs playin')
        falseEmbed.setTimestamp()
        const queue = player.getQueue(message.guild.id);
        if (!queue) return message.channel.send({embeds: [falseEmbed]});
        const success = queue.setPaused(true);
        const embed = new MessageEmbed();
        if (success) {
            embed.setAuthor({name: 'true', iconURL: 'https://cdn.discordapp.com/attachments/625276725269364738/961355212512169984/unknown.png'})
            embed.setDescription(`paused ${queue.current.title}`)
            embed.setTimestamp()
        } else {
            embed.setAuthor({name: 'false', iconURL: 'https://cdn.discordapp.com/attachments/625276725269364738/961355228446347264/unknown.png'})
            embed.setDescription(`could not porse`)
            embed.setTimestamp()
        }

        return message.channel.send({embeds: [embed]});
    },
};