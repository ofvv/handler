const discord = require('discord.js')

module.exports = {
  name: "eval",
  owner: {
    owners: ['484701017015975936'],
    ownerOnly: true
  },
  server: {
    servers: [],
    serverOnly: false
  },
  permissions: {
    bot: [],
    author: []
  },
  blacklist: {
    servers: [],
    users: []
  },
  bots: {
    use: false
  },
  allowed: {
    server: true,
    dm: true
  },
  cooldown: {
    db: true,
    cd: 5000
  },
  ghostbot: {
    botdelete: true,
    authordelete: true,
    deleteafter: 2000,
    enabled: true
  },
  aliases: ["evalcmd"],
  description: "Eval",
  usage: "z!eval",
  category: "Owner",
  run: async (client, message, args, prefix) => {
    const code = args.join(" ");
    if (!code) return message.lineReplyNoMention("**Please Provide Some Code!**")
    try {
      let evaled = eval(code);
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      const success = new discord.MessageEmbed()
        .addField(`Code:`, `\`\`\`js\n${code}\n\`\`\``, false)
        .addField(`Output:`, `\`\`\`js\n${evaled}\n\`\`\``, false)
        .addField(`Type:`, `\`\`\`js\n` + typeof(evaled) + `\n\`\`\``, false)
        .setColor(client.embedcolor)
        .setFooter("Success")
      message.lineReplyNoMention(success)
    } catch (e) {
      const errem = new discord.MessageEmbed()
        .addField(`Code:`, `\`\`\`js\n${code}\n\`\`\``, false)
        .addField(`Output:`, `\`\`\`js\n${e}\n\`\`\``, false)
        .addField(`Type:`, `\`\`\`js\n` + typeof(evaled) + `\n\`\`\``, false)
        .setColor(client.embedcolor)
        .setFooter("Error")
      message.lineReplyNoMention(errem)
    }
  }
}
