const { EmbedBuilder } = require('discord.js');

module.exports = async ({ inter, queue }) => {
    if (!queue?.isPlaying()) return inter.editReply({ content: `No music currently playing... try again ? ❌` });
    if (!queue.tracks.toArray()[0]) return inter.editReply({ content: `No music in the queue after the current one ${inter.member}... try again ? ❌` });

    await queue.tracks.shuffle();

    const embed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({ name: `Queue shuffled ${queue.tracks.size} song(s)! ✅` });

    return inter.editReply({ embeds: [embed] });
}