const Discord = require("discord.js")
const fs = require("fs")
const client = new Discord.Client()

const settings = require ("./config/bot.json") //The bot connects using the configuration file

const emotes = require ("./config/emojis.json") //The bot finds emojis

const { Player } = require("discord-player"); //Create a new Player (Youtube API key is your Youtube Data v3 key)

const player = new Player(client, settings.youtube_api); //To easily access the player

client.player = player;

client.on("ready", () => {

    console.log("The bot is ready to play music"); //If the bot is ready it sends a message in the console

});

client.login(settings.token_bot); //The bot connects thanks to the token

client.on('message', async message => {

    let prefix = settings.prefix
        
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
      
      
    if(!message.content.startsWith(prefix)) return;
    let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(client,message,args)
        
      
        
})
      
    client.commands = new Discord.Collection();
    client.aliases =  new Discord.Collection();

    fs.readdir("./commands/", (err, files) => {
      
    let jsfile = files.filter(f => f.split(".").pop() === "js") 

    if(jsfile.length <= 0) {
        return console.log("Couldn't Find Commands !");
    }

    jsfile.forEach((f, i) => {
        
    console.log(`Run command ${f}`);

    let pull = require(`./commands/${f}`);

    client.commands.set(pull.config.name, pull);  
    pull.config.aliases.forEach(alias => {
    client.aliases.set(alias, pull.config.name)
                
    });
})});
