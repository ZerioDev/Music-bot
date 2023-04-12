const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'history',
    description: 'See the history of the queue',
    voiceChannel: false,

    async execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue || queue.history.tracks.toArray().length == 0) return inter.editReply({ content: `No music has been played yet`, ephemeral: true });

        const tracks = queue.history.tracks.toArray();

        let description = tracks
            .slice(0, 20)
            .map((track, index) => { return `**${index + 1}.** [${track.title}](${track.url})` })
            .join('\r\n\r\n');

        let ClearEmbed = new EmbedBuilder()
            .setTitle(`History`)
            .setDescription(description)
            .setColor('#2f3136')

        inter.editReply({ embeds: [ClearEmbed] });

    },
};