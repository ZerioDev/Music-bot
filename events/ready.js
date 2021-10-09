module.exports = async (client) => {
   

         let guilds = client.guilds.cache.map(guild => guild.id);
         console.log(`Discord Info:`)
         console.log(`Total Users ${client.users.cache.size}`);
         console.log(`Total Channels ${client.channels.cache.size}`);
         console.log(`Total Guilds ${client.guilds.cache.size}`);
         console.log(`Guild id's ${guilds}`)
         console.log('bot status', client.user.presence.status);
         console.log(`${client.user.username} is Ready!`);
         console.log('Made with love by ZerioDEV');
        
        client.user.setActivity(client.config.app.playing);
        };