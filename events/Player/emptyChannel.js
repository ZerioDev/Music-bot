const { EmbedBuilder } = require('discord.js');

module.exports = (queue) => {
    const embed = new EmbedBuilder()
        .setAuthor({ name: `Nobody is in the voice channel, leaving the voice channel!  ❌` })
        .setColor('#2f3136');

    queue.metadata.send({ embeds: [embed] });
}
