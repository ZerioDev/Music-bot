module.exports = {
    app: {
        px: '>',
        token: 'OTYxMzU3MDAzMjYxODk0NzM2.Yk3zeg.JczBKR62_5ieOhsx6U28agxP40U',
        playing: 'true'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume']
        },
        maxVol: 100,
        loopMessage: false,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
