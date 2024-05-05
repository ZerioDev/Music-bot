const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'skip',
    description: 'Skip the track',
    voiceChannel: true,

    execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: `No music currently playing ${inter.member}... try again ? ❌` });

        const success = queue.node.skip();

        const embed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: success ? `Current music ${queue.currentTrack.title} skipped ✅` : `Something went wrong ${inter.member}... try again ? ❌` });

        return inter.editReply({ embeds: [embed] });
    }
}