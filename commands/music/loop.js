const { QueueRepeatMode, useQueue } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'loop',
    description:('Toggle the looping of song\'s or the whole queue'),
    voiceChannel: true,
    options: [
        {
            name: 'action',
            description:('What action you want to preform on the loop'),
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: 'Queue', value: 'enable_loop_queue' },
                { name: 'Disable', value: 'disable_loop' },
                { name: 'Song', value: 'enable_loop_song' },
                { name: 'Autoplay', value: 'enable_autoplay' },
            ],
        }
    ],

   async execute({ inter }) {
        const queue = useQueue(inter.guild);
        const errorMessage = await Translate(`Something went wrong <${inter.member}>... try again ? <❌>`);
        let baseEmbed = new EmbedBuilder()
            .setColor('#2f3136');

        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing <${inter.member}>... try again ? <❌>`) });

        switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
            case 'enable_loop_queue': {
                if (queue.repeatMode === QueueRepeatMode.TRACK) return inter.editReply({ content: `You must first disable the current music in the loop mode (\`/loop Disable\`) ${inter.member}... try again ? ❌` });

                const success = queue.setRepeatMode(QueueRepeatMode.QUEUE);
                baseEmbed.setAuthor({ name: success ? errorMessage : await Translate(`Repeat mode enabled the whole queue will be repeated endlessly <🔁>`) })

                return inter.editReply({ embeds: [baseEmbed] });
            }
            case 'disable_loop': {
                if (queue.repeatMode === QueueRepeatMode.OFF) return inter.editReply({ content: await Translate(`You must first enable the loop mode <(/loop Queue or /loop Song)> <${inter.member}>... try again ? <❌>`) });

                const success = queue.setRepeatMode(QueueRepeatMode.OFF);
                baseEmbed.setAuthor({ name: success ? errorMessage : await Translate(`Repeat mode disabled the queue will no longer be repeated <🔁>`) })

                return inter.editReply({ embeds: [baseEmbed] });
            }
            case 'enable_loop_song': {
                if (queue.repeatMode === QueueRepeatMode.QUEUE) return inter.editReply({ content: await Translate(`You must first disable the current music in the loop mode <(\`/loop Disable\`)> <${inter.member}>... try again ? <❌>`) });

                const success = queue.setRepeatMode(QueueRepeatMode.TRACK);
                baseEmbed.setAuthor({ name: success ? errorMessage : await Translate(`Repeat mode enabled the current song will be repeated endlessly (you can end the loop with <\`/loop disable\` >)`) })

                return inter.editReply({ embeds: [baseEmbed] });
            }
            case 'enable_autoplay': {
                if (queue.repeatMode === QueueRepeatMode.AUTOPLAY) return inter.editReply({ content: await Translate(`You must first disable the current music in the loop mode <(\`/loop Disable\`)> <${inter.member}>... try again ? <❌>`) });

                const success = queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
                baseEmbed.setAuthor({ name: success ? errorMessage : await Translate(`Autoplay enabled the queue will be automatically filled with similar songs to the current one <🔁>`) })

                return inter.editReply({ embeds: [baseEmbed] });
            }
        }
    }
}