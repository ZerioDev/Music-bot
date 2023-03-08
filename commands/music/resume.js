module.exports = {
    name: 'resume',
    description: 'Play the track',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue) return inter.reply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });
        

        if(queue.node.isPlaying()) return inter.reply({content: `The track is already running, ${inter.member}... try again ? ❌`, ephemeral: true})

        const success = queue.node.resume();
        
        return inter.reply({ content:success ? `Current music ${queue.currentTrack.title} resumed ✅` : `Something went wrong ${inter.member}... try again ? ❌`});
    },
};
