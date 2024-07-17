const { EmbedBuilder } = require('discord.js');
const { Translate } = require('../process_tools');

module.exports = async ({ inter, queue }) => {
    if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing... try again ? <❌>`) });

    const embed = new EmbedBuilder()
        .setColor('Red')
        .setTitle(`:arrow_forward: ${queue.currentTrack.title}`)
        .setURL(queue.currentTrack.url)
        .addFields(
            { name: await Translate('Duration <:hourglass:>'), value: `\`${queue.currentTrack.duration}\``, inline: true },
            { name: await Translate('Song by:'), value: `\`${queue.currentTrack.author}\``, inline: true },
            { name: await Translate('Views <:eyes:>'), value: `\`${Number(queue.currentTrack.views).toLocaleString()}\``, inline: true },
            { name: await Translate('Song <URL>:'), value: `\`${queue.currentTrack.url}\`` }
        )
        .setThumbnail(queue.currentTrack.thumbnail)
        .setFooter({ text: await Translate(`From the server <${inter.member.guild.name}>`), iconURL: inter.member.guild.iconURL({ dynamic: false }) });

    inter.member.send({ embeds: [embed] })
        .then(async () => {
            return inter.editReply({ content: await Translate(`I have sent you the title of the music by private messages <✅>`) });
        }).catch(async (error) => {
            console.error(error);
            return inter.editReply({ content: await Translate(`Unable to send you a private message... try again ? <❌>`) });
        });
}
