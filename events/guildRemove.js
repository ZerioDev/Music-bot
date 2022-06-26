module.exports = async (client) => {
    client.user.setActivity(`help for ${client.users.cache.size} in ${client.guilds.cache.size} servers`);
};