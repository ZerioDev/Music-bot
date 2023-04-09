const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'stop',
    description: 'stop the track',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content:`No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });

        queue.delete();

        const StopEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: `Music stopped into this server, see you next time ✅` })


       return inter.editReply({ embeds: [StopEmbed] });

    },
};