const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../translate');

module.exports = {
    name: 'back',
    description: "Go back to the last song played",
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        const isPlayingContent = await Translate(`no music currently playing... try again? <❌>`);
        const historyContent = await Translate(`there was no music played before... try again? <❌>`);
        const textCombine = `${inter.member} ${isPlayingContent}`;
        const textCombine1 = `${inter.member} ${historyContent}`;
        
        if (!queue?.isPlaying()) return inter.editReply({ content: textCombine, });

        if (!queue.history.previousTrack) return inter.editReply({ content: textCombine1, });

        await queue.history.back();

        const backEmbed = new EmbedBuilder()
            .setAuthor({ name: await Translate(`Playing the previous track <✅>`) })
            .setColor('#2f3136');

        inter.editReply({ embeds: [backEmbed] });
    }
}