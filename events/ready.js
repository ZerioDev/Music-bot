module.exports = async (client) => {

    console.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);

    client.user.setActivity(client.config.game);

};
