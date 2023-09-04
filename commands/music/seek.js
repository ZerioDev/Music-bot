const ms = require('ms');
const {  ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

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
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `No music currently playing ${inter.editReply}... try again ? ❌`, ephemeral: true });

        const timeToMS = ms(inter.options.getString('time'));

        if (timeToMS >= queue.currentTrack.durationMS) return inter.editReply({ content:`The indicated time is higher than the total time of the current song ${inter.member}... try again ? ❌\n*Try for example a valid time like **5s, 10s, 20 seconds, 1m**...*`, ephemeral: true });

        await queue.node.seek(timeToMS);

        const SeekEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: `Time set on the current song **${ms(timeToMS, { long: true })}** ✅`})


        inter.editReply({ embeds: [SeekEmbed] });
    },
};