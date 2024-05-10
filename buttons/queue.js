const { EmbedBuilder } = require('discord.js');
const { Translate } = require('../translate');

module.exports = async ({ client, inter, queue }) => {
    if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing... try again ? <❌>`) });
    if (!queue.tracks.toArray()[0]) return inter.editReply({ content: await Translate(`No music in the queue after the current one <${inter.member}>... try again ? <❌>`) });

    const methods = ['', '🔁', '🔂'];
    const songs = queue.tracks.size;
    const nextSongs = songs > 5 ? await Translate(`And <**${songs - 5}**> other song(s)...`) : await Translate(`In the playlist <**${songs}**> song(s)...`);
    const tracks = await Promise.all(queue.tracks.map(async (track, i) => await Translate(`<**${i + 1}**. [${track.author} - ${track.title}](${track.url})>.`)));

    const embed = new EmbedBuilder()
        .setColor('#2f3136')
        .setThumbnail(inter.guild.iconURL({ size: 2048, dynamic: true }))
        .setAuthor({ name: await Translate(`Server queue - <${inter.guild.name}> <${methods[queue.repeatMode]}>`), iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setDescription(await Translate(`Now Playing <[${queue.currentTrack.author} - ${queue.currentTrack.title}](${queue.currentTrack.url})> <\n\n> <${tracks.slice(0, 5).join('\n')}> <\n\n> <${nextSongs}>`))
        .setTimestamp()
        .setFooter({ text: await Translate('Music comes first - Made with heart by the Community <❤️>'), iconURL: inter.member.avatarURL({ dynamic: true }) });

    inter.editReply({ embeds: [embed] });
}
