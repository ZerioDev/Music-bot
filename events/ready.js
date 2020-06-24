const config = require(`../config/bot.json`)

module.exports = async (client) => {

    //If the bot is ready it sends a message in the console
    console.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);

    //Game
    client.user.setActivity(config.game)

}
