const { Translate } = require("../process_tools");

module.exports = async ({ inter, queue }) => {
    if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing... try again ? <❌>`) });

    const success = queue.node.skip();

    return inter.editReply({ content: success ? await Translate(`Current music <${queue.currentTrack.title}> skipped <✅>`) : await Translate(`Something went wrong <${inter.member}>... try again ? <❌>`) });
}