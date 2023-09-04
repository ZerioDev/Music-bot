const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    if (!queue.tracks.toArray()[0]) return inter.editReply({ content: `No music in the queue after the current one ${inter.member}... try again ? ❌`, ephemeral: true });

        await queue.tracks.shuffle();

        const ShuffleEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: `Queue shuffled ${queue.tracks.size} song(s)! ✅` })


       return inter.editReply({ embeds: [ShuffleEmbed], ephemeral: true});
}