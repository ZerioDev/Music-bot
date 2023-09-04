const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { QueryType, useMainPlayer, useQueue   } = require('discord-player');

module.exports = {
    name: 'playnext',
    description: "song you want to playnext",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the song you want to playnext',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });

        const song = inter.options.getString('song');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return inter.editReply({ content: `No results found ${inter.member}... try again ? ❌`, ephemeral: true });

       if (res.playlist) return inter.editReply({ content: `This command dose not support playlist's ${inter.member}... try again ? ❌`, ephemeral: true });

        queue.insertTrack(res.tracks[0], 0)

        const PlayNextEmbed = new EmbedBuilder()
        .setAuthor({name: `Track has been inserted into the queue... it will play next 🎧` })
        .setColor('#2f3136')
        
        await inter.editReply({ embeds: [PlayNextEmbed] });


    }
}
