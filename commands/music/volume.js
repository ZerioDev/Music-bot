const maxVol = client.config.opt.maxVol || 100;
const { ApplicationCommandOptionType } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'volume',
    description: 'Adjust the volume',
    voiceChannel: true,
    options: [
        {
            name: 'volume',
            description: 'The new volume',
            type: ApplicationCommandOptionType.Number,
            required: true,
            minValue: 1,
            maxValue: maxVol
        }
    ],

    execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: `No music currently playing ${inter.member}... try again ? ❌` });

        const vol = inter.options.getNumber('volume');
        if (queue.node.volume === vol) return inter.editReply({ content: `The new volume is already the current one ${inter.member}... try again ? ❌` });

        const success = queue.node.setVolume(vol);

        return inter.editReply({ content: success ? `The volume has been modified to ${vol}/${maxVol}% 🔊` : `Something went wrong ${inter.member}... try again ? ❌` });
    }
}