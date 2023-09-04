const { EmbedBuilder } = require('discord.js')

module.exports = async ({ inter, queue }) => {
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    inter.member.send({
        embeds: [
            new EmbedBuilder()
                .setColor('Red')
                .setTitle(`:arrow_forward: ${queue.currentTrack.title}`)
                .setURL(queue.currentTrack.url)
                .addFields(
                    { name: ':hourglass: Duration:', value: `\`${queue.currentTrack.duration}\``, inline: true },
                    { name: 'Song by:', value: `\`${queue.currentTrack.author}\``, inline: true },
                    { name: 'Views :eyes:', value: `\`${Number(queue.currentTrack.views).toLocaleString()}\``, inline: true },
                    { name: 'Song URL:', value: `\`${queue.currentTrack.url}\`` }
                )
                .setThumbnail(queue.currentTrack.thumbnail)
                .setFooter({ text: `from the server ${inter.member.guild.name}`, iconURL: inter.member.guild.iconURL({ dynamic: false }) })
        ]
    }).then(() => {
        return inter.editReply({ content: `I have sent you the title of the music by private messages ✅`, ephemeral: true });
    }).catch(error => {
        return inter.editReply({ content: `Unable to send you a private message... try again ? ❌`, ephemeral: true });
    });


}
