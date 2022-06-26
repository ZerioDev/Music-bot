module.exports = async (client) => {
    console.log([
        `--------------------------------------------------`,
        `Logged in as ${client.user.username}`,
        `--------------------------------------------------`,
        `-> Ready on ${client.guilds.cache.size} servers for a total of ${client.users.cache.size} users`,
        `--------------------------------------------------`
    ].join('\n'))


    client.user.setActivity(`help for ${client.users.cache.size} users in ${client.guilds.cache.size} servers`);
};