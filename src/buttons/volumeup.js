const maxVol = client.config.opt.maxVol;
module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    const vol = Math.floor(queue.node.volume + 5)

    if (vol > maxVol ) return inter.editReply({ content: `I can not move the volume up any more ${inter.member}... try again ? ❌`, ephemeral: true })

    if (queue.node.volume === vol) return inter.editReply({ content: `The volume you want to change is already the current one ${inter.member}... try again ? ❌`, ephemeral: true });

    const success = queue.node.setVolume(vol);

    return inter.editReply({ content: success ? `The volume has been modified to ${vol}/${maxVol}% 🔊` : `Something went wrong ${inter.member}... try again ? ❌`, ephemeral: true});
}