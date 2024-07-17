const maxVol = client.config.opt.maxVol || 100;
const { ApplicationCommandOptionType } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'volume',
    description:('Adjust the volume'),
    voiceChannel: true,
    options: [
        {
            name: 'volume',
            description:('The new volume'),
            type: ApplicationCommandOptionType.Number,
            required: true,
            minValue: 1,
            maxValue: maxVol
        }
    ],

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing <${inter.member}>... try again ? <❌>`) });

        const vol = inter.options.getNumber('volume');
        if (queue.node.volume === vol) return inter.editReply({ content: await Translate(`The new volume is already the current one <${inter.member}>... try again ? <❌>`) });

        const success = queue.node.setVolume(vol);

        return inter.editReply({ content: success ? await Translate(`The volume has been modified to <${vol}/${maxVol}%> <🔊>`) : `Something went wrong ${inter.member}... try again ? ❌` });
    }
}