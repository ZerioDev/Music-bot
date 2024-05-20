const { Translate } = require('../../process_tools');

module.exports = async (client) => {
    console.log(await Translate(`Logged to the client <${client.user.username}>.`));
    console.log(await Translate("Let's play some music !"));
    
    client.user.setActivity(client.config.app.playing);
}