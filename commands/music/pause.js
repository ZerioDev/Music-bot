const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'pause',
    description: 'pause the track',
    voiceChannel: true,

    execute({ inter }) {
const queue = useQueue(inter.guild);
        const player = useMainPlayer()

        if (!queue) return inter.editReply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });
        
        if(queue.node.isPaused()) return inter.editReply({content: `The track is currently paused, ${inter.member}... try again ? ❌`, ephemeral: true})

        const success = queue.node.setPaused(true);
        
        const PauseEmbed = new EmbedBuilder()
        .setAuthor({name: success ? `Current music ${queue.currentTrack.title} paused ✅` : `Something went wrong ${inter.member}... try again ? ❌` })
        .setColor('#2f3136')
        
        return inter.editReply({ embeds: [PauseEmbed] });
    },
};
// embed update stoped here