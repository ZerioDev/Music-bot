
module.exports = {
    app: {
        token: 'XXX',
        playing: 'Music 🖤',
        global: true,
        guild: 'XXX'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        maxVol: 100,
        fixedChannel: 'XXX',
        leaveOnEnd: false,
        autoSelfDeaf: true,
        leaveOnEmpty: true,
        leaveOnStop: false,
        loopMessage: false,
        spotifyBridge: true,
        defaultvolume: 75,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};

