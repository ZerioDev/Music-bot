const { EmbedBuilder } = require('discord.js');
const { Translate } = require('../process_tools');

module.exports = async ({ inter, queue }) => {
    if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing... try again ? <❌>`) });
    if (!queue.tracks.toArray()[0]) return inter.editReply({ content: await Translate(`No music in the queue after the current one <${inter.member}>... try again ? <❌>`) });

    await queue.tracks.shuffle();

    const embed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({ name: await Translate(`Queue shuffled <${queue.tracks.size}> song(s)! <✅>`) });

    return inter.editReply({ embeds: [embed] });
}