const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'remove',
    description: "remove a song from the queue",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the name/url of the track you want to remove',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: 'the place in the queue the song is in',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) { 
        const player = useMainPlayer()

        const number =  inter.options.getNumber('number')
        const track = inter.options.getString('song');

const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });
        if (!track && !number) inter.editReply({ content: `You have to use one of the options to remove a song ${inter.member}... try again ? ❌`, ephemeral: true });

        const BaseEmbed = new EmbedBuilder()
        .setColor('#2f3136')


        if (track) {
            const track_to_remove = queue.tracks.toArray().find((t) => t.title === track || t.url === track);
            if (!track_to_remove) return inter.editReply({ content: `could not find ${track} ${inter.member}... try using the url or the full name of the song ? ❌`, ephemeral: true });
            queue.removeTrack(track_to_remove);
            BaseEmbed.setAuthor({name: `removed ${track_to_remove.title} from the queue ✅` })

            return inter.editReply({ embeds: [BaseEmbed] });
        }

        if (number) {

            const index = number - 1
            const trackname = queue.tracks.toArray()[index].title

            if (!trackname) return inter.editReply({ content: `This track dose not seem to exist ${inter.member}...  try again ?❌`, ephemeral: true });   

            queue.removeTrack(index);

            BaseEmbed.setAuthor({name: `removed ${trackname} from the queue ✅` })

            return inter.editReply({ embeds: [BaseEmbed] });
        }


         
    }
}
