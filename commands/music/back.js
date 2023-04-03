const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'back',
    description: "Go back the song before",
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue || !queue.node.isPlaying()) return inter.reply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });

        if (!queue.history.previousTrack) return inter.reply({ content: `There was no music played before ${inter.member}... try again ? ❌`, ephemeral: true });

        await queue.history.back();

        const BackEmbed = EmbedBuilder()
        .setAuthor({name: `Playing the **previous** track ✅`})
        .setColor('#2f3136')

        inter.reply({ embeds: [BackEmbed] });
    },
};