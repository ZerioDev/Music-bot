const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');

player.on('error', (queue, error) => {
    console.log(`Error emitted from the queue ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Error emitted from the connection ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    const embed = new EmbedBuilder()
    .setAuthor({name: `Started playing ${track.title} in ${queue.connection.channel.name} 🎧`, iconURL: track.requestedBy.avatarURL()})
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
    queue.metadata.send({ embeds: [embed], components: [row1] })
});

player.on('trackAdd', (queue, track) => {
   
    queue.metadata.send(`Track ${track.title} added in the queue ✅`);
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send('I was manually disconnected from the voice channel, clearing queue... ❌');
});

player.on('channelEmpty', (queue) => {
    if(client.config.opt.leaveOnEmpty) // Only show this if leave on Empty is true.
    queue.metadata.send('Nobody is in the voice channel, leaving the voice channel... ❌');
    else queue.setPaused(true) // Empty channel, let's pause the music until someone comes.
});

// Use this whenever you want the bot to react to mutes/unmutes or join/disconnects
client.on('voiceStateUpdate', (oldState, newState) => {
    let newUserChannel = oldState.voiceChannel
    let oldUserChannel = newState.voiceChannel
    console.log(newUserChannel);
    console.log(oldUserChannel);
    if(oldUserChannel === undefined && newUserChannel !== undefined) {
        // User Joins a voice channel
        const queue = player.getQueue(newUserChannel.guild.id); // Grab queue
        console.log("Voice size: " + newUserChannel.channel.members.size); 
       if(queue.connection.paused && newUserChannel.channel.members.size == 2) queue.setPaused(false) // Unpause the song only if there is now 1 member in the channel from 0.
    } else if(newUserChannel === undefined){  
      // User leaves a voice channel
  
    }
  })
player.on('queueEnd', (queue) => {
    queue.metadata.send('I finished reading the whole queue ✅');
});

player.on('tracksAdd', (queue, tracks) => {
    queue.metadata.send(`All the songs in playlist added into the queue ✅`);
});