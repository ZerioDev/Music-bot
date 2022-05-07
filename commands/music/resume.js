const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'resume',
    aliases: ['rs'],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        let falseEmbed = new MessageEmbed()
        falseEmbed.setAuthor({name: 'false', iconURL: 'https://cdn.discordapp.com/attachments/625276725269364738/961355228446347264/unknown.png'})
        falseEmbed.setDescription('no songs playin')
        falseEmbed.setTimestamp()

        if (!queue) return message.channel.send({embeds: [falseEmbed]});

        const success = queue.setPaused(false);

        return message.channel.send(success ? `${queue.current.title} resumed` : `errer`);
    },
};