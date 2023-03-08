const maxVol = client.config.opt.maxVol;
module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.reply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    const vol = Math.floor(queue.node.volume + 5)

    if (vol > maxVol ) return inter.reply({ content: `I can not move the volume up any more ${inter.member}... try again ? ❌`, ephemeral: true })

    if (queue.node.volume === vol) return inter.reply({ content: `The volume you want to change is already the current one ${inter.member}... try again ? ❌`, ephemeral: true });

    try {
        queue.node.setVolume(vol);
    } catch {
        return inter.reply({ content: `Something went wrong ${inter.member}... try again ? ❌`, ephemeral: true});
    }

    return inter.reply({ content: `The volume has been modified to **${vol}**/**${maxVol}**% 🔊`, ephemeral: true});
}
