const { EmbedBuilder } = require('discord.js');
const { Translate } = require('../../translate');

module.exports = (queue, track) => {

    (async () => {
        const embed = new EmbedBuilder()
        .setAuthor({ name: await Translate(`Skipping <**${track.title}**> due to an issue! <❌>`)})
        .setColor('#EE4B2B');

        const message = await queue.metadata.channel.send({ embeds: [embed], iconURL: track.thumbnail });
        setTimeout(() => {
            message.delete();
        }, 1000);
    })()
}
