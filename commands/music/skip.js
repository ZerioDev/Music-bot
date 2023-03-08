module.exports = {
    name: 'skip',
    description: 'stop the track',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue || !queue.isPlaying()) return inter.reply({ content:`No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });

        const success = queue.node.skip();

        return inter.reply({ content: success ? `Current music ${queue.currentTrack.title} skipped ✅` : `Something went wrong ${inter.member}... try again ? ❌`});
    },
};
