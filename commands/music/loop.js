const { QueueRepeatMode } = require('discord-player');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'loop',
    description: 'Enable or disable looping of song\'s or the whole queue',
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
        ],
    }
    ],
    execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue || !queue.isPlaying()) return inter.reply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });
        switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
            case 'enable_loop_queue': {
                if (queue.repeatMode === QueueRepeatMode.TRACK) return inter.reply({ content:`You must first disable the current music in the loop mode (/loop Disable) ${inter.member}... try again ? ❌`, ephemeral: true });

                try {
                    queue.setRepeatMode(QueueRepeatMode.QUEUE);
                } catch {
                    return inter.reply({ content: `Something went wrong ${inter.member}... try again ? ❌` });
                }

                return inter.reply({ content: `Repeat mode **enabled** the whole queue will be repeated endlessly 🔁` });
                break
            }
            case 'disable_loop': {
                if (queue.repeatMode === QueueRepeatMode.OFF) return inter.reply({ content: `The loop is currently disabled ${inter.member}... try again ? ❌`, ephemeral: true })
                
                try {
                    queue.setRepeatMode(QueueRepeatMode.OFF);
                } catch {
                    return inter.reply({ content: `Something went wrong ${inter.member}... try again ? ❌` });
                }

                return inter.reply({ content: `Repeat mode **disabled**` });
                break
            }
            case 'enable_loop_song': {
                if (queue.repeatMode === QueueRepeatMode.QUEUE) return inter.reply({ content:`You must first disable the current music in the loop mode (/loop Disable) ${inter.member}... try again ? ❌`, ephemeral: true });

                try {
                    queue.setRepeatMode(QueueRepeatMode.TRACK);
                } catch {
                    return inter.reply({ content: `Something went wrong ${inter.member}... try again ? ❌`, ephemeral: true });
                }

                return inter.reply({ content: `Repeat mode **enabled** the current song will be repeated endlessly (you can end the loop with /loop disable)` });
                break
            }
        }
       
    },
};
