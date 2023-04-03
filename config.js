module.exports = {
    app: {
        token: 'MTAwNjc0NTExNTQ2Mjc1MDI4OQ.GOPHJU.g0fqvhpgLb33Wts_xYwuSuJST4DFrx5ygv_xSw',
        playing: 'by Zerio ❤️',
        global: true,
        guild: '773639842449850368',
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
