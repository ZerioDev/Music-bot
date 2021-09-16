module.exports = {
    name: 'invite',
    aliases: [''],
    category: 'Infos',
    utilisation: '{prefix}invite',

    execute(client, message, args) {
  
 message.channel.send({ embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.displayAvatarURL()
    },
    title: "YAY!",
    url: "",
    description: "",
    fields: [ {
        name: "invite me!",
        value: "enjoy high quality music [invite me!](https://discord.com/oauth2/authorize?client_id=880787723709988876&scope=bot&permissions=8)"
      },
],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.displayAvatarURL(),
      text: " your name"
    }
                },
            });
    },
};
