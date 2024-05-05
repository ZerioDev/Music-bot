const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'resume',
    description: 'Play the track',
    voiceChannel: true,

    execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue) return inter.editReply({ content: `No music currently playing ${inter.member}... try again ? ❌` });

        if (queue.node.isPlaying()) return inter.editReply({ content: `The track is already running, ${inter.member}... try again ? ❌` })

        const success = queue.node.resume();

        const resumeEmbed = new EmbedBuilder()
            .setAuthor({ name: success ? `Current music ${queue.currentTrack.title} resumed ✅` : `Something went wrong ${inter.member}... try again ? ❌` })
            .setColor('#2f3136')

        return inter.editReply({ embeds: [resumeEmbed] });
    }
}
