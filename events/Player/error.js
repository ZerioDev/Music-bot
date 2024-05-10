const { EmbedBuilder } = require("discord.js");
const { Translate } = require("../../translate");

module.exports = (queue, error) => {
  (async () => {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: await Translate(
          `Bot had an unexpected error, please check the console imminently!`
        ),
      })
      .setColor("#EE4B2B");

    queue.metadata.channel.send({ embeds: [embed] });

    console.log(await Translate(`Error emitted from the Bot <${error}>`));
  })();
};
