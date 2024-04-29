const { EmbedBuilder } = require('discord.js');

module.exports = (queue, track) => {
    if (!client.config.app.extraMessages) return;

    const embed = new EmbedBuilder()
        .setAuthor({ name: `Track ${track.title} added in the queue ✅`, iconURL: track.thumbnail })
        .setColor('#2f3136');

    queue.metadata.send({ embeds: [embed] });
}
