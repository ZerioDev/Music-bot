const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'stop',
    aliases: ['dc'],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    execute(client, message) {
        let falseEmbed = new MessageEmbed()
        falseEmbed.setAuthor({name: 'false', iconURL: 'https://cdn.discordapp.com/attachments/625276725269364738/961355228446347264/unknown.png'})
        falseEmbed.setDescription('no songs playin')
        falseEmbed.setTimestamp()

        if (!queue || !queue.playing) return message.channel.send({embeds: [falseEmbed]});

        queue.destroy();

        message.channel.send(`stoped`);
    },
};