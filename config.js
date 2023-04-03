module.exports = {
    app: {
        token: 'xxx',
        playing: 'by Zerio ❤️',
        global: true,
        guild: 'xxx',
        ExtraMessages: false,
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        maxVol: 100,
        leaveOnEnd: true,
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
