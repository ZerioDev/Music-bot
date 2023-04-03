const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'skip',
    description: 'stop the track',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

         if (!queue || !queue.isPlaying()) return inter.reply({ content:`No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });

        const success = queue.node.skip();

        const SkipEmbed = EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: success ? `Current music ${queue.currentTrack.title} skipped ✅` : `Something went wrong ${inter.member}... try again ? ❌` })


       return inter.reply({ embeds: [SkipEmbed] });

    },
};