module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.reply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    let success = null;

    if (queue.node.isPaused()) {
        queue.node.resume()
        return inter.reply({ content: `Current music ${queue.currentTrack.title} resumed ✅`, ephemeral: true});
    } else {
        queue.node.pause()
        return inter.reply({ content: `Current music ${queue.currentTrack.title} paused ✅`, ephemeral: true});
    }
}
