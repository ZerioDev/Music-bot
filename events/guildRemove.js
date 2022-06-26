module.exports = async (client) => {
    client.user.setActivity(`help for ${client.users.cache.size} users in ${client.guilds.cache.size} servers`);
};