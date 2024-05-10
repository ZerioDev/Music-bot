const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../translate');

module.exports = {
    name: 'stop',
    description: 'Stop the track',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing <${inter.member}>... try again ? <❌>`) });
        
        if (queue.metadata.message && queue.metadata.channel && queue.metadata.message.channel.id === queue.metadata.channel.id) {
            try {
                await queue.metadata.message.delete();
            } catch (error) {
            }
        }

        queue.delete();

        const embed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: await Translate(`Music stopped into this server, see you next time <✅>`) });

        return inter.editReply({ embeds: [embed] });
    }
}