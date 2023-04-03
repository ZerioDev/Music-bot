const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'stop',
    description: 'stop the track',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue || !queue.isPlaying()) return inter.reply({ content:`No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });

        queue.delete();

        const StopEmbed = EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: `Music stopped into this server, see you next time ✅` })


       return inter.reply({ embeds: [StopEmbed] });

    },
};