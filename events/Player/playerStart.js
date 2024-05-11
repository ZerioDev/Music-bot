const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");
const { Translate } = require("../../translate");

module.exports = async (queue, track) => {
    if (!client.config.app.loopMessage && queue.repeatMode !== 0) return;

    // Delete previous message if it exists
    if (queue.metadata.message && queue.metadata.channel && queue.metadata.message.channel.id === queue.metadata.channel.id) {
        try {
            await queue.metadata.message.delete();
        } catch (error) {
        }
    }

    const embed = new EmbedBuilder()
        .setAuthor({
            name: await Translate(
                `Started playing <${track.title}> in <${queue.channel.name}> <🎧>`
            ),
            iconURL: track.thumbnail,
        })
        .setColor("#2f3136");

    const back = new ButtonBuilder()
        .setEmoji(client.config.emoji.back)
        .setCustomId("back")
        .setStyle("Primary");

    const skip = new ButtonBuilder()
        .setEmoji(client.config.emoji.skip)
        .setCustomId("skip")
        .setStyle("Primary");

    const resumepause = new ButtonBuilder()
        .setEmoji(client.config.emoji.resumepause)
        .setCustomId("resume&pause")
        .setStyle("Secondary");

    const stop = new ButtonBuilder()
        .setEmoji(client.config.emoji.stop)
        .setCustomId("stop")
        .setStyle("Danger");

    const lyrics = new ButtonBuilder()
        .setEmoji(client.config.emoji.lyrics)
        .setCustomId("lyrics")
        .setStyle("Secondary");

    const row1 = new ActionRowBuilder().addComponents(
        back,
        resumepause,
        stop,
        lyrics,
        skip
    );

    const message = await queue.metadata.channel.send({ embeds: [embed], components: [row1] });

    // Update metadata with the new message
    queue.metadata.message = message;
};