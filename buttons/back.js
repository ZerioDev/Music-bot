const { Translate } = require("../translate");

module.exports = async ({ inter, queue }) => {
  if (!queue?.isPlaying())
    return inter.editReply({
      content: await Translate(`No music currently playing... try again ? <❌>`),
    });
  
  const replyContent = await Translate(`there was no music played before... try again? <❌>`);
  const textCombine = `${inter.member} ${replyContent}`;
  if (!queue.history.previousTrack)
    return inter.editReply({
      content: textCombine,
    });

  await queue.history.back();

  inter.editReply({
    content: await Translate(`Playing the previous track <✅>`),
  });
};
