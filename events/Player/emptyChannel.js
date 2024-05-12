const { EmbedBuilder } = require('discord.js');
const { Translate } = require('../../translate');

module.exports = async (queue) => {
    if (queue.metadata.lyricsThread) {
        queue.metadata.lyricsThread.delete();
        queue.setMetadata({
            channel: queue.metadata.channel
        });
    }

    (async () => {
        if (client.config.opt.leaveOnEmpty) {
            try {
                if (queue.metadata.message && queue.metadata.channel && queue.metadata.message.channel.id === queue.metadata.channel.id) {
                    try {
                        await queue.metadata.message.delete();
                    } catch (error) {
                    }
                }
                const embed = new EmbedBuilder()
                    .setAuthor({ name: await Translate(`Nobody is in the voice channel, leaving the voice channel!  <❌>`)})
                    .setColor('#2f3136');
                
                const message = await queue.metadata.channel.send({ embeds: [embed] });
                setTimeout(() => {
                    message.delete();
                }, 1000);
            } catch (error) {
            }
        }
    })();
}