player.on('error', (queue, error) => {
    console.log(`Error emitted from the queue ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Error emitted from the connection ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    queue.metadata.send(`started 💀 ${track.title}`);
});

player.on('trackAdd', (queue, track) => {
    queue.metadata.send(`💀 ${track.title} added in the 💀 ✅`);
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send('i got kicked 💀');
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send('💀');
});

player.on('queueEnd', (queue) => {
    queue.metadata.send('que endid 💀');
});