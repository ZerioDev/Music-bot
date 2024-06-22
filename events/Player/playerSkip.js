const { EmbedBuilder } = require('discord.js');
const { Translate } = require("../../process_tools");

module.exports = (queue, track) => {

    (async () => {
        const embed = new EmbedBuilder()
        .setAuthor({ name: await Translate(`Skipping <${track.title}>`)})
        .setColor('#ed4245');

        queue.metadata.channel.send({ embeds: [embed], iconURL: track.thumbnail });
    })()
}
