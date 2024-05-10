const { EmbedBuilder } = require("discord.js");
const { Translate } = require("../../translate");

module.exports = (queue, track) => {
  if (!client.config.app.extraMessages) return;

  let txt = `Track <${track.title}> added in the queue <✅>`(async () => {
    const embed = new EmbedBuilder()
      .setAuthor({ name: await Translate(txt), iconURL: track.thumbnail })
      .setColor("#2f3136");

    queue.metadata.channel.send({ embeds: [embed] });
  })();
};
