const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");
const { Translate } = require("../../translate");

module.exports = (queue, track) => {
  if (!client.config.app.loopMessage && queue.repeatMode !== 0) return;

  (async () => {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: await Translate(
          `Started playing <${track.title}> in <${queue.channel.name}> <🎧>`
        ),
        iconURL: track.thumbnail,
      })
      .setColor("#2f3136");

    const back = new ButtonBuilder()
      .setLabel("Back")
      .setCustomId("back")
      .setStyle("Primary");

    const skip = new ButtonBuilder()
      .setLabel("Skip")
      .setCustomId("skip")
      .setStyle("Primary");

    const resumepause = new ButtonBuilder()
      .setLabel("Resume & Pause")
      .setCustomId("resume&pause")
      .setStyle("Danger");

    const loop = new ButtonBuilder()
      .setLabel("Loop")
      .setCustomId("loop")
      .setStyle("Secondary");

    const lyrics = new ButtonBuilder()
      .setLabel("Lyrics")
      .setCustomId("lyrics")
      .setStyle("Secondary");

    const row1 = new ActionRowBuilder().addComponents(
      back,
      loop,
      resumepause,
      lyrics,
      skip
    );
    queue.metadata.channel.send({ embeds: [embed], components: [row1] });
  })();
};
