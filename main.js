const { Player } = require('discord-player');
const { Client, GatewayIntentBits } = require('discord.js');

global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ],
    disableMentions: 'everyone',
});

client.config = require('./config');

const player = new Player(client, client.config.opt.discordPlayer);
player.extractors.loadDefault();

console.clear()
require('./loader');

client.login(client.config.app.token)
.catch(async (e) => {
    console.clear()
    if(e.message == 'An invalid token was provided.'){
        try{
            const module = await import("chalk");
            chalk = module.default || module;
            console.error(
                chalk.red(`\n
                ❌ Invalid Token Provided! ❌
            change the token in the config file\n\n`)
                
                + chalk.white(`app: `) + chalk.magenta(`{\n`) + 
                chalk.green(`\ttoken: `) + chalk.yellow(`> > >`) + chalk.red(`'xxx'`) + chalk.yellow(`< < <\n`) +
                chalk.green(`\tplaying: `) + chalk.blue(`'by the Community ❤️',\n`) +
                chalk.green(`\tglobal: `) + chalk.blue(`${client.config.app?.global},\n`) +
                chalk.green(`\tguild: `) + chalk.blue(`'${client.config.app?.guild}',\n`) +
                chalk.green(`\textraMessages: `) + chalk.blue(`${client.config.app?.extraMessages},\n`) +
                chalk.green(`\tloopMessage: `) + chalk.blue(`${client.config.app?.loopMessage},\n`) +
                chalk.green(`\tlang: `) + chalk.blue(`'${client.config.app?.lang}',\n`) +
                chalk.green(`\tTranslate_Timeout: `) + chalk.blue(`${client.config.app?.Translate_Timeout},\n`) +
                chalk.green(`\tenableEmojis: `) + chalk.blue(`${client.config.app?.enableEmojis},\n`) +
                chalk.magenta(`},\n`));

                process.exit(1);
        } catch (e) {
            throw new Error('❌ Could not load the Chalk module properly, the error will be printed without highlighting ❌')
        }


    }
});