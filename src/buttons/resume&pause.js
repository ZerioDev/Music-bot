module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    const success = queue.node.resume();
    
    if (!success) queue.node.pause();
    

    return inter.editReply({ content: `${success ? `Current music ${queue.currentTrack.title} resumed ✅` : `Current music ${queue.currentTrack.title} paused ✅`}`, ephemeral: true});
}