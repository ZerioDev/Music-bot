module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    if (!queue.history.previousTrack) return inter.editReply({ content: `There was no music played before ${inter.member}... try again ? ❌`, ephemeral: true });

    await queue.history.back();

    inter.editReply({ content:`Playing the **previous** track ✅`, ephemeral: true});
}
