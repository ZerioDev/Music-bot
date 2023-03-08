const ms = require('ms');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'seek',
    description: 'skip back or foward in a song',
    voiceChannel: true,
    options: [
    {
        name: 'time',
        description: 'time that you want to skip to',
        type: ApplicationCommandOptionType.String,
        required: true,
    }
    ],
    async execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue || !queue.isPlaying()) return inter.reply({ content: `No music currently playing ${inter.reply}... try again ? ❌`, ephemeral: true });

        const timeToMS = ms(inter.options.getString('time'));

        if (timeToMS >= queue.currentTrack.durationMS) return inter.reply({ content:`The indicated time is higher than the total time of the current song ${inter.member}... try again ? ❌\n*Try for example a valid time like **5s, 10s, 20 seconds, 1m**...*`, ephemeral: true });

        await queue.node.seek(timeToMS);

        /*
            Seek function is currently broken, waiting on some fix from the devs...
        */

        inter.reply({ content: `Time set on the current song **${ms(timeToMS, { long: true })}** ✅`});
    },
};
