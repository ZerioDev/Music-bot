module.exports = async ({ inter, queue }) => {
    if (!queue?.isPlaying()) return inter.editReply({ content: `No music currently playing... try again ? ❌` });

    const success = queue.node.skip();

    return inter.editReply({ content: success ? `Current music ${queue.currentTrack.title} skipped ✅` : `Something went wrong ${inter.member}... try again ? ❌` });
}