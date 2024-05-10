const { EmbedBuilder } = require('discord.js');
const { Translate } = require('../../translate');

module.exports = async (queue, error) => {
    
    if (queue.metadata.message && queue.metadata.channel && queue.metadata.message.channel.id === queue.metadata.channel.id) {
        try {
            await queue.metadata.message.delete();
        } catch (error) {
        }
    }

    (async () => {
        const embed = new EmbedBuilder()
        .setAuthor({ name: await Translate(`Bot had an unexpected error, please check the console imminently!`)})
        .setColor('#EE4B2B');

        const message = await queue.metadata.channel.send({ embeds: [embed] });
        setTimeout(() => {
            message.delete();
        }, 10000);

        console.log(await Translate(`Error emitted from the Bot <${error}>`))
    })()
}