const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'shuffle',
    description: 'shuffle the track',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue || !queue.isPlaying()) return inter.reply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });

        if (!queue.tracks.toArray()[0]) return inter.reply({ content: `No music in the queue after the current one ${inter.member}... try again ? ❌`, ephemeral: true });

        await queue.tracks.shuffle();

        const ShuffleEmbed = EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: `Queue shuffled **${queue.tracks.size}** song(s) ! ✅` })


       return inter.reply({ embeds: [ShuffleEmbed] });
    },
};