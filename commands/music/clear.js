const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'clear',
    aliases: ['cq'],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        let falseEmbed = new MessageEmbed()
        falseEmbed.setAuthor({name: 'false', iconURL: 'https://cdn.discordapp.com/attachments/625276725269364738/961355228446347264/unknown.png'})
        falseEmbed.setDescription('no songs')
        falseEmbed.setTimestamp()

        if (!queue || !queue.playing) return message.channel.send({embeds: [falseEmbed]});

        if (!queue.tracks[0]) return message.channel.send({embeds: [falseEmbed]});

        await queue.clear();

        let trueEmbed = new MessageEmbed()
        trueEmbed.setAuthor({name: 'true', iconURL: 'https://cdn.discordapp.com/attachments/625276725269364738/961355212512169984/unknown.png'})
        trueEmbed.setDescription('clear songed')
        trueEmbed.setTimestamp()

        message.channel.send({embeds: [trueEmbed]});
    },
};