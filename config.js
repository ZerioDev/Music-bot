module.exports = {
    app: {
        token: 'xxx',
        playing: 'by the Community ❤️',
        global: true,
        guild: 'xxx',
        extraMessages: false,
        loopMessage: false,
        lang: 'en'
    },
    
    emoji: {
        stop: '⏹️',
        skip: '⏭',
        queue: '📋',
        resumepause: '⏯',
        lyrics: '📝',
        back: '⏮',
        save: '💾',
        volumeup: '🔊',
        volumedown: '🔉',
        loop: '🔄',
        np: '🎧',
        shuffle: '🔀'
    }, // customEmoji use <:emojiName:emojiID>

    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        maxVol: 100,
        spotifyBridge: true,
        volume: 75,
        leaveOnEmpty: true,
        leaveOnEmptyCooldown: 30000,
        leaveOnEnd: true,
        leaveOnEndCooldown: 30000,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
