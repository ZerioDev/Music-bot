const { EmbedBuilder } = require("discord.js");
const { Translate } = require("../../translate");

module.exports = (queue) => {
  if (!client.config.app.extraMessages) return;
  let txt = `All the songs in playlist added into the queue <✅>`(async () => {
    const embed = new EmbedBuilder()
      .setAuthor({ name: await Translate(txt) })
      .setColor("#2f3136");

    queue.metadata.channel.send({ embeds: [embed] });
  })();
};
