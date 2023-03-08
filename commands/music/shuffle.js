module.exports = {
    name: 'shuffle',
    description: 'shuffle the track',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue || !queue.isPlaying()) return inter.reply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });

        if (!queue.tracks.toArray()[0]) return inter.reply({ content: `No music in the queue after the current one ${inter.member}... try again ? ❌`, ephemeral: true });

        await queue.tracks.shuffle();

        return inter.reply({ content:`Queue shuffled **${queue.tracks.size}** song(s) ! ✅`});
    },
};
