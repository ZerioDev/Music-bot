module.exports = {
    name: 'back',
    description: "Go back the song before",
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue || !queue.node.isPlaying()) return inter.reply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });

        if (!queue.history.previousTrack) return inter.reply({ content: `There was no music played before ${inter.member}... try again ? ❌`, ephemeral: true });

        await queue.history.back();

        inter.reply({ content:`Playing the **previous** track ✅`});
    },
};
