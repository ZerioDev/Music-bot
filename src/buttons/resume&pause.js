module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.reply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    const success = queue.node.resume();
    
    if (!success) queue.node.pause();
    

    return inter.reply({ content: `${success ? `Current music ${queue.currentTrack.title} paused ✅` : `Current music ${queue.currentTrack.title} resumed ✅`}`, ephemeral: true});
}