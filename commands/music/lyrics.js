const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'lyrics',
    description: 'Get the lyrics for the current track',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: `No music currently playing ${inter.member}... try again ? ❌` });

        try {
            const search = await genius.songs.search(queue.currentTrack.title);

            const song = search.find(song => song.artist.name.toLowerCase() === queue.currentTrack.author.toLowerCase());
            if (!song) return inter.editReply({ content: `No lyrics found for ${queue.currentTrack.title}... try again ? ❌` });

            const lyrics = await song.lyrics();
            const embeds = [];
            for (let i = 0; i < lyrics.length; i += 4096) {
                const toSend = lyrics.substring(i, Math.min(lyrics.length, i + 4096));
                const embed = new EmbedBuilder()
                    .setTitle(`Lyrics for ${queue.currentTrack.title}`)
                    .setDescription(toSend)
                    .setColor('#2f3136')
                    .setTimestamp()
                    .setFooter({ text: 'Music comes first - Made with heart by Zerio ❤️', iconURL: inter.member.avatarURL({ dynamic: true }) });
                embeds.push(embed);
            }
            return inter.editReply({ embeds: embeds });

        } catch (error) {
            inter.editReply({ content: `Error! Please contact Developers! | ❌` });
        }
    }
}

