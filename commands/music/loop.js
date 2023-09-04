const { QueueRepeatMode, useMainPlayer, useQueue } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'loop',
    description: 'enable or disable looping of song\'s or the whole queue',
    voiceChannel: true,
    options: [
        {
        name: 'action' ,
        description: 'what action you want to preform on the loop',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
            { name: 'Queue', value: 'enable_loop_queue' },
            { name: 'Disable', value: 'disable_loop'},
            { name: 'Song', value: 'enable_loop_song' },
            { name: 'autoplay', value: 'enable_autoplay' },
        ],
    }
    ],
    execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);
        let BaseEmbed = new EmbedBuilder()
        .setColor('#2f3136')

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });
        switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
            case 'enable_loop_queue': {
                if (queue.repeatMode === QueueRepeatMode.TRACK) return inter.editReply({ content:`You must first disable the current music in the loop mode (/loop Disable) ${inter.member}... try again ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode(QueueRepeatMode.QUEUE);
                
                BaseEmbed.setAuthor({ name: success ? `Something went wrong ${inter.member}... try again ? ❌` : `Repeat mode enabled the whole queue will be repeated endlessly 🔁` })

                return inter.editReply({ embeds: [BaseEmbed] });
                
            }
            case 'disable_loop': {
                if (queue.repeatMode === QueueRepeatMode.OFF) return inter.editReply({ content:`You must first enable the loop mode (/loop Queue or /loop Song) ${inter.member}... try again ? ❌`, ephemeral: true });
                
                const success = queue.setRepeatMode(QueueRepeatMode.OFF);

                BaseEmbed.setAuthor({ name: success ? `Something went wrong ${inter.member}... try again ? ❌` : `Repeat mode disabled the queue will no longer be repeated 🔁`})

                return inter.editReply({ embeds: [BaseEmbed] });
                
            }
            case 'enable_loop_song': {
                if (queue.repeatMode === QueueRepeatMode.QUEUE) return inter.editReply({ content:`You must first disable the current music in the loop mode (/loop Disable) ${inter.member}... try again ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode(QueueRepeatMode.TRACK);

                BaseEmbed.setAuthor({ name: success ? `Something went wrong ${inter.member}... try again ? ❌` : `Repeat mode enabled the current song will be repeated endlessly (you can end the loop with /loop disable)` })

                return inter.editReply({ embeds: [BaseEmbed] });
                
            }
            case 'enable_autoplay': {
                if (queue.repeatMode === QueueRepeatMode.AUTOPLAY) return inter.editReply({ content:`You must first disable the current music in the loop mode (/loop Disable) ${inter.member}... try again ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);

                BaseEmbed.setAuthor({ name: success ? `Something went wrong ${inter.member}... try again ? ❌` : `Autoplay enabled the queue will be automatically filled with similar songs to the current one 🔁` })

                return inter.editReply({ embeds: [BaseEmbed] });

            }
        }
       
    },
};