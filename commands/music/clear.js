const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'clear',
    description: 'clear all the music in the queue',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });

        if (!queue.tracks.toArray()[1]) return inter.editReply({ content: `No music in the queue after the current one ${inter.member}... try again ? ❌`, ephemeral: true });

        await queue.tracks.clear();

        const ClearEmbed = new EmbedBuilder()
        .setAuthor({name: `The queue has just been cleared 🗑️`})
        .setColor('#2f3136')
        
        inter.editReply({ embeds: [ClearEmbed] });

    },
};