const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'jump',
    description: "Jumps to particular track in queue",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the name/url of the track you want to jump to',
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
        const track = inter.options.getString('song');
        const number =  inter.options.getNumber('number')

        const queue = player.nodes.get(inter.guildId);

        const alltracks = queue.tracks.toArray()

        if (!queue || !queue.isPlaying()) return inter.reply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });
        if (!track && !number) inter.reply({ content: `You have to use one of the options to jump to a song ${inter.member}... try again ? ❌`, ephemeral: true });

        if (track) {
            for (let song of alltracks) {
                if (song.title === track || song.url === track ) {
                    queue.node.skipTo(song)
                    return inter.reply({ content: `Skipped to ${track} ✅` });
                }
            }   
            return inter.reply({ content: `Could not find ${track} ${inter.member}... try using the url or the full name of the song ? ❌`, ephemeral: true });    
        }

        if (number) {
            const index = number - 1
            const trackname = alltracks[index].title
            if (!trackname) return inter.reply({ content: `This track dose not seem to exist ${inter.member}...  try again ?❌`, ephemeral: true });   
            queue.node.skipTo(index);
            return inter.reply({ content: `Jumped to ${trackname}  ✅` });
        }
         
    }
}
