const { QueueRepeatMode } = require('discord-player');
module.exports = async ({  inter, queue }) => { 

    const methods = ['disabled', 'track', 'queue'];

    if (!queue || !queue.isPlaying()) return inter.reply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    const repeatMode = queue.repeatMode

    if (repeatMode === QueueRepeatMode.OFF) queue.setRepeatMode(QueueRepeatMode.TRACK)

    if (repeatMode === QueueRepeatMode.TRACK) queue.setRepeatMode(QueueRepeatMode.QUEUE)

    if (repeatMode === QueueRepeatMode.QUEUE) queue.setRepeatMode(QueueRepeatMode.OFF)
    
    return inter.reply({ content: `Loop has been set to **${methods[queue.repeatMode]}**.✅`})

}
