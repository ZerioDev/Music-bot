const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'resume',
    description: 'play the track',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue) return inter.editReply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });
        

        if(queue.node.isPlaying()) return inter.editReply({content: `The track is already running, ${inter.member}... try again ? ❌`, ephemeral: true})

        const success = queue.node.resume();
        
        const ResumeEmbed = new EmbedBuilder()
        .setAuthor({name: success ? `Current music ${queue.currentTrack.title} resumed ✅` : `Something went wrong ${inter.member}... try again ? ❌` })
        .setColor('#2f3136')
        
        return inter.editReply({ embeds: [ResumeEmbed] });

    },
};
