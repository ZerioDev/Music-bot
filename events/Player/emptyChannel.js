const { EmbedBuilder } = require('discord.js');

module.exports = (queue) => {
    if (queue.metadata.lyricsThread) {
        queue.metadata.lyricsThread.delete();
        queue.setMetadata({
            channel: queue.metadata.channel
        });
    }
    const embed = new EmbedBuilder()
        .setAuthor({ name: `Nobody is in the voice channel, leaving the voice channel!  ❌` })
        .setColor('#2f3136');

    queue.metadata.channel.send({ embeds: [embed] });
}
