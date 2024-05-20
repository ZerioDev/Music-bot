const { Translate } = require('../process_tools');

const maxVol = client.config.opt.maxVol;

module.exports = async ({ inter, queue }) => {
    if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing... try again ? <❌>`) });

    const vol = Math.floor(queue.node.volume - 5);
    if (vol < 0) return inter.editReply({ content: await Translate(`I can not move the volume down any more <${inter.member}>... try again ? <❌>`) });
    if (queue.node.volume === vol) return inter.editReply({ content: await Translate(`The volume you want to change is already the current one <${inter.member}>... try again ? <❌>`) });

    const success = queue.node.setVolume(vol);
    return inter.editReply({ content: success ? await Translate(`The volume has been modified to <${vol}/${maxVol}% 🔊>`) : await Translate(`Something went wrong <${inter.member}>... try again ? <❌>`) });
}