const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    utilisation: '{prefix}queue',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        let falseEmbed = new MessageEmbed()
        falseEmbed.setAuthor({name: 'false', iconURL: 'https://cdn.discordapp.com/attachments/625276725269364738/961355228446347264/unknown.png'})
        falseEmbed.setDescription('this was an epic fail')
        falseEmbed.setTimestamp()

        if (!queue) return message.channel.send({embeds: [falseEmbed]});

        if (!queue.tracks[0]) return message.channel.send({embeds: [falseEmbed]});

        const embed = new MessageEmbed();
        const methods = ['', '🔁', '🔂'];

        embed.setColor('RED');
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setAuthor({name: 'hi', iconURL: 'https://cdn.discordapp.com/attachments/625276725269364738/961355228446347264/unknown.png'});

        const tracks = queue.tracks.map((track, i) => `**${i + 1} - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `& **${songs - 5} other song(s)...` : `In the playlist **${songs} song(s)...`;

        embed.setDescription(`current ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

        embed.setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};