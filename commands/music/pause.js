module.exports = {
    name: 'pause',
    description: 'pause the track',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });

        const success = queue.setPaused(true);
        
        return inter.reply({ content: success ? `Current music ${queue.current.title} paused ✅` : `Something went wrong ${inter.member}... try again ? ❌` });
    },
};