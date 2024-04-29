module.exports = async ({ inter, queue }) => {
    if (!queue?.isPlaying()) return inter.editReply({ content: `No music currently playing... try again ? ❌` });

    const resumed = queue.node.resume();
    let message = `Current music ${queue.currentTrack.title} resumed ✅`;

    if (!resumed) {
        queue.node.pause();
        message = `Current music ${queue.currentTrack.title} paused ✅`;
    }

    return inter.editReply({ content: message });
}