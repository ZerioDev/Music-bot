module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    if (!queue.previousTracks[1]) return inter.reply({ content: `There was no music played before ${inter.member}... try again ? ❌`, ephemeral: true });

    await queue.back();

    inter.reply({ content:`Playing the **previous** track ✅`, ephemeral: true});
}
