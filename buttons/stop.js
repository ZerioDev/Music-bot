const { EmbedBuilder } = require('discord.js');
const { Translate } = require('../translate');

module.exports = async ({ inter, queue }) => {
    if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing... try again ? <❌>`) });

    queue.delete();
    
    if (queue.metadata.message && queue.metadata.channel && queue.metadata.message.channel.id === queue.metadata.channel.id) {
        try {
            await queue.metadata.message.delete();
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    }

    const embed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({ name: await Translate(`Music stopped into this server, see you next time <✅>`) });

    return inter.editReply({ embeds: [embed] });
}