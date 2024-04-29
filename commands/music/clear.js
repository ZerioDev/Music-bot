const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'clear',
    description: 'Clear all the music in the queue',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: `No music currently playing ${inter.member}... try again ? ❌` });

        if (!queue.tracks.toArray()[1]) return inter.editReply({ content: `No music in the queue after the current one ${inter.member}... try again ? ❌` });

        queue.tracks.clear();

        const clearEmbed = new EmbedBuilder()
            .setAuthor({ name: `The queue has just been cleared 🗑️` })
            .setColor('#2f3136');

        inter.editReply({ embeds: [clearEmbed] });
    }
}