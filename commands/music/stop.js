const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'stop',
    description: 'Stop the track',
    voiceChannel: true,

    execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: `No music currently playing ${inter.member}... try again ? ❌` });

        queue.delete();

        const embed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: `Music stopped into this server, see you next time ✅` });

        return inter.editReply({ embeds: [embed] });
    }
}