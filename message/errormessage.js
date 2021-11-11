module.exports.musicSearchErr = function(message){
    message.channel.send(`Please enter a valid search ${message.author}... try again ? ❌`);
}

module.exports.noMusicPlayingErr = function(message){
    message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);
}