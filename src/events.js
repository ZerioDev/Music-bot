const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');

player.events.on('error', (queue, error) => {
    console.log(`Error emitted from the queue ${error.message}`);
});

player.events.on('playerError', (queue, error) => {
    console.log(`Error emitted from the connection ${error.message}`);
});

player.events.on('playerStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;

    const embed = new EmbedBuilder()
        .setAuthor({name: `Started playing ${track.title} in ${queue.channel.name} 🎧`, iconURL: track.requestedBy.avatarURL()})
        .setColor('#13f857')

        const back = new ButtonBuilder()
        .setLabel('Back')
        .setCustomId(JSON.stringify({ffb: 'back'}))
        .setStyle('Primary')
    
        const skip = new ButtonBuilder()
        .setLabel('Skip')
        .setCustomId(JSON.stringify({ffb: 'skip'}))
        .setStyle('Primary')
    
        const resumepause = new ButtonBuilder()
        .setLabel('Resume & Pause')
        .setCustomId(JSON.stringify({ffb: 'resume&pause'}))
        .setStyle('Danger')
    
        const loop = new ButtonBuilder()
        .setLabel('Loop')
        .setCustomId(JSON.stringify({ffb: 'loop'}))
        .setStyle('Secondary')
        
        const queuebutton = new ButtonBuilder()
        .setLabel('Queue')
        .setCustomId(JSON.stringify({ffb: 'queue'}))
        .setStyle('Secondary')
    
        const row1 = new ActionRowBuilder().addComponents(back, loop, resumepause, queuebutton, skip)
        queue.metadata.channel.send({ embeds: [embed], components: [row1] })
});

player.events.on('audioTrackAdd', (queue, track) => {
    queue.metadata.channel.send(`Track ${track.title} added in the queue ✅`);
});

player.events.on('disconnect', (queue) => {
    queue.metadata.channel.send('I was manually disconnected from the voice channel, clearing queue... ❌');
});

player.events.on('emptyChannel', (queue) => {
    queue.metadata.channel.send('Nobody is in the voice channel, leaving the voice channel... ❌');
});

player.events.on('emptyQueue', (queue) => {
    queue.metadata.channel.send('I finished reading the whole queue ✅');
});

player.events.on('audioTracksAdd', (queue, tracks) => {
    queue.metadata.channel.send(`All the songs in playlist added into the queue ✅`);
});
