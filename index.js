const { ShardingManager } = require('discord.js');
require('dotenv').config();

let TOKEN = process.env.CLIENT_TOKEN;

const manager = new ShardingManager('./main.js', { 
    token: TOKEN,
    shardCount: "auto"
 });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();