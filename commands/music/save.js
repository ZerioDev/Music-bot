const { EmbedBuilder } = require("discord.js");
const { useQueue } = require('discord-player');

module.exports = {
    name: 'save',
    description: 'Save the current track!',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: `No music currently playing ${inter.member}... try again ? ❌` });

        const embed = new EmbedBuilder()
            .setColor('#2f3136')
            .setTitle(`:arrow_forward: ${queue.currentTrack.title}`)
            .setURL(queue.currentTrack.url)
            .addFields(
                { name: ':hourglass: Duration:', value: `\`${queue.currentTrack.duration}\``, inline: true },
                { name: 'Song by:', value: `\`${queue.currentTrack.author}\``, inline: true },
                { name: 'Views :eyes:', value: `\`${Number(queue.currentTrack.views).toLocaleString()}\``, inline: true },
                { name: 'Song URL:', value: `\`${queue.currentTrack.url}\`` }
            )
            .setThumbnail(queue.currentTrack.thumbnail)
            .setFooter({ text: `From the server ${inter.member.guild.name}`, iconURL: inter.member.guild.iconURL({ dynamic: false }) });

        inter.member.send({ embeds: [embed] })
        .then(() => {
            return inter.editReply({ content: `I have sent you the music in private messages ✅` });
        }).catch(() => {
            return inter.editReply({ content: `Unable to send you a private message... try again ? ❌` });
        });
    }
}