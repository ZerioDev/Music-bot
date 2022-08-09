const maxVol = client.config.opt.maxVol;

module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

        const vol = Math.floor(queue.volume - 5)

        if (vol < 0 ) return inter.reply({ content: `I can not move the volume down any more ${inter.member}... try again ? ❌`, ephemeral: true })
        
        if (queue.volume === vol) return inter.reply({ content: `The volume you want to change is already the current one ${inter.member}... try again ? ❌`, ephemeral: true });

        const success = queue.setVolume(vol);

        return inter.reply({ content:success ? `The volume has been modified to **${vol}**/**${maxVol}**% 🔊` : `Something went wrong ${inter.member}... try again ? ❌`, ephemeral: true});
}