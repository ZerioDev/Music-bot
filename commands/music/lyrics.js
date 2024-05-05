const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'lyrics',
    description: 'Get the lyrics for the current track',
    voiceChannel: true,

    async execute({ inter }) {
        const player = useMainPlayer();
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: `No music currently playing ${inter.member}... try again ? ❌` });

        const results = await player.lyrics
            .search({
                q: queue.currentTrack.title
            })
            .catch((e) => {
                console.log(e);
                return inter.editReply({ content: `Error! Please contact Developers! | ❌` });
            });

        const lyrics = results?.[0];
        if (!lyrics?.plainLyrics) return inter.editReply({ content: `No lyrics found for ${queue.currentTrack.title}... try again ? ❌` });

        const trimmedLyrics = lyrics.plainLyrics.substring(0, 1997);

        const embed = new EmbedBuilder()
            .setTitle(`Lyrics for ${queue.currentTrack.title}`)
            .setAuthor({
                name: lyrics.artistName
            })
            .setDescription(trimmedLyrics.length === 1997 ? `${trimmedLyrics}...` : trimmedLyrics)
            .setFooter({ text: 'Music comes first - Made with heart by Zerio ❤️', iconURL: inter.member.avatarURL({ dynamic: true }) })
            .setTimestamp()
            .setColor('#2f3136');

        return inter.editReply({ embeds: [embed] });
    }
}

