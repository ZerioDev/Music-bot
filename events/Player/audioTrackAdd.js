const { EmbedBuilder } = require('discord.js');
const { Translate } = require("../../translate");

module.exports = (queue, track) => {
    if (!client.config.app.extraMessages) return;

    (async () => {
        const embed = new EmbedBuilder()
        .setAuthor({ name: await Translate(`Track added in the queue <✅>`), iconURL: track.thumbnail })
        .setDescription(`[${track.author} - ${track.title}](${track.url})`)
        .setColor('#2f3136');

        const message = await queue.metadata.channel.send({ embeds: [embed] });
        setTimeout(() => {
            message.delete();
        }, 10000);
    })();
};