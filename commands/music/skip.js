const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'skip',
    aliases: ['sk'],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        let falseEmbed = new MessageEmbed()
        falseEmbed.setAuthor({name: 'false', iconURL: 'https://cdn.discordapp.com/attachments/625276725269364738/961355228446347264/unknown.png'})
        falseEmbed.setDescription('no songs playin')
        falseEmbed.setTimestamp()

        if (!queue || !queue.playing) return message.channel.send({embeds: [falseEmbed]});

        const success = queue.skip();

        return message.channel.send(success ? `skipped ` : `errer`);
    },
};