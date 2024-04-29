const { QueueRepeatMode } = require('discord-player');

module.exports = async ({ inter, queue }) => {
    const methods = ['disabled', 'track', 'queue'];
    if (!queue?.isPlaying()) return inter.editReply({ content: `No music currently playing... try again ? ❌` });
    
    switch(queue.repeatMode) {
        case 0: {
            queue.setRepeatMode(QueueRepeatMode.TRACK)
            break;
        }
        case 1: {
            queue.setRepeatMode(QueueRepeatMode.QUEUE)
            break;
        }
        case 2: {
            queue.setRepeatMode(QueueRepeatMode.OFF)
            break;
        }
    }

    return inter.editReply({ content: `Loop made has been set to **${methods[queue.repeatMode]}**.✅` });
}