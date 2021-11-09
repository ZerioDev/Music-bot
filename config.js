module.exports = {
    app: {
        px: '/',
        token: 'NTI0NTAwNTM1NjUxNDY3MjY0.XXyfHw.hWVvfsDqnKClaWb_rGkyjb0lJek',
        playing: 'by PPUKJ ❤️'
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
