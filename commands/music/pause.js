const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'pause',
    description: 'Pause the track',
    voiceChannel: true,

    execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: `No music currently playing ${inter.member}... try again ? ❌` });

        if (queue.node.isPaused()) return inter.editReply({ content: `The track is currently paused, ${inter.member}... try again ? ❌` });

        const success = queue.node.setPaused(true);
        const pauseEmbed = new EmbedBuilder()
            .setAuthor({ name: success ? `Current music ${queue.currentTrack.title} paused ✅` : `Something went wrong ${inter.member}... try again ? ❌` })
            .setColor('#2f3136')

        return inter.editReply({ embeds: [pauseEmbed] });
    }
}